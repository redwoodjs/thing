import { Movie } from '@prisma/client'
import { db } from 'src/lib/db'

import { createPlayer } from 'api/src/services/players/players'
import { createPlay, updatePlay } from 'api/src/services/plays/plays'

/**
 * randomMovie can be used to pick the correct movie when creating a new play
 *
 * It uses a sample of all movies then randomly orders
 * to pick just one randomly selected movie
 *
 * @see tsm_system_rows https://www.postgresql.org/docs/9.5/tsm-system-rows.html
 *
 * @returns A movie
 */
export const randomMovie = async () => {
  // Note: Be sure to run a migration that creates the tsm_system_rows Postgres extension
  // See: https://www.postgresql.org/docs/9.5/tsm-system-rows.html
  const movies = await db.$queryRaw<
    Movie[]
  >`select * from "Movie" TABLESAMPLE SYSTEM_ROWS(100) LIMIT 1`

  return movies[0]
}

/**
 * possiblesForMovieId returns the movies options to pick from in a play given a movie id.
 *
 * The movieId is the correct movie. It is used to pick four other
 * possible movies based on the date of the given movie.
 * Since we ask the player to pick the year, we want to pick four possibles that are
 * somewhat contemporaneous, but not the same years as thr given movie.
 *
 * The logic is, given a movie, take a sampling of movies +/- 4 years from the movie's
 * release year.
 *
 * Then pick four of those and add back in the given movie, shuffle and return five movies:
 * the four and the given.
 *
 * @param movieId the id of the correct movie upon which to select four other possible option
 * @returns The possible movies for a play. This includes the correct Movie and four others
 *
 */
export const possiblesForMovieId = async ({ movieId }) => {
  const movies = await db.$queryRaw<Movie[]>`WITH picked_movie AS (
    SELECT
      *
    FROM
      "Movie"
    WHERE
      id = ${movieId}
  ),
  movie_years AS (
    SELECT
      m.*
    FROM
      "Movie" m
      LEFT JOIN picked_movie ON m.id != picked_movie.id
    WHERE
      date_part('year',
        m. "releasedOn") != date_part('year',
        picked_movie. "releasedOn")
      AND m. "releasedOn" BETWEEN picked_movie. "releasedOn" - Interval '4 years'
      AND picked_movie. "releasedOn" + interval '4 years'
      ),
  candidate_movies AS (
    SELECT
      *
    FROM
      movie_years
    ORDER BY
      RANDOM()
    LIMIT 4
  ),
  all_movie_options AS (
    SELECT
      *
    FROM
      candidate_movies
    UNION
    SELECT
      *
    FROM
      picked_movie
  )
  SELECT
    *
  FROM
    all_movie_options
  ORDER BY
    RANDOM()`

  // console.log(movies)

  return movies
}

export const createNewGamePlay = async () => {
  // Here we'll pick the currentUser instead
  const player = await createPlayer({ input: { name: 'Player' } })

  // Ideally this would be in a transaction, but may have to do some checks
  // that data is valid to go the the next step
  // Or use the preview Prisma feature "Interactive Transactions"
  // See: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions-in-preview

  const correctMovie = await randomMovie()

  const possibleMovies = await possiblesForMovieId({ movieId: correctMovie.id })
  const possibleMoviesIds = possibleMovies.map((movie) => {
    return { movieId: movie.id }
  })

  const gamePlay = await createPlay({
    input: {
      player: { connect: { id: player.id } },
      correctMovie: {
        connect: {
          id: correctMovie.id,
        },
      },
      possibleMovies: { create: possibleMoviesIds },
      answeredMovie: undefined,
    },
  })

  return gamePlay
}

// Ideally this would be in a transaction, but may have to do some checks
// that data is valid to go the the next step
// Or use the preview Prisma feature "Interactive Transactions"
// See: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions-in-preview
// Note: Don't pass in player, but get from currentUser
export const answerPlay = async ({ playId, playerId, answeredMovieId }) => {
  // make sure the play belongs to the player
  const unansweredPlays = await db.play.findMany({
    where: {
      id: playId,
      playerId, // currentUser.id
      answeredMovieId: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const currentPlay = unansweredPlays[0]

  let correctness = null

  if (currentPlay) {
    if (currentPlay.correctMovieId == answeredMovieId) {
      correctness = true
    } else {
      correctness = false
    }
  }

  const answered = await updatePlay({
    id: currentPlay.id,
    input: { correctness, answeredMovie: { connect: { id: answeredMovieId } } },
  })

  return answered
}
