import { getYear, parseISO } from 'date-fns'

import { Movie } from '@prisma/client'
import { db } from 'src/lib/db'

import { createPlayer } from 'src/services/players'
import { createPlay, updatePlay } from 'src/services/plays'
import { logger } from 'src/lib/logger'
import { ValidationError } from '@redwoodjs/graphql-server'

const isTest = process.env.NODE_ENV === 'test'

/**
 * randomMovie can be used to pick the correct movie when creating a new play
 *
 * It uses a sample of all movies then randomly orders
 * to pick just one randomly selected movie
 *
 * @returns A movie
 */
export const randomMovie = async () => {
  // The sampleSize is important based on the total number of records
  // which impacts the initial random set from which one movie is selected.
  //
  // Since the test database has only a few movies, then this sample needs
  // to be larger than is in production where there may be thousands of movies
  //
  // The probability of a row to be returned from TABLESAMPLE BERNOULLI(1) is 1/100, that is, 0.01

  let movies = []

  if (isTest) {
    movies = await db.$queryRaw<Movie[]>`WITH movie_sample AS (
    SELECT
      *
    FROM
      "Movie" TABLESAMPLE BERNOULLI (100)
  )
  SELECT
    *
  FROM
    movie_sample
  ORDER BY
    RANDOM()
  LIMIT 1`
  } else {
    movies = await db.$queryRaw<Movie[]>`WITH movie_sample AS (
      SELECT
        *
      FROM
        "Movie" TABLESAMPLE BERNOULLI (1)
    )
    SELECT
      *
    FROM
      movie_sample
    ORDER BY
      RANDOM()
    LIMIT 1`
  }

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

  return movies
}
export const createGame = async () => {
  // Here we'll pick the currentUser instead
  const player = await createPlayer({ input: { name: 'Player' } })

  // Ideally this would be in a transaction, but may have to do some checks
  // that data is valid to go the the next step
  // Or use the preview Prisma feature "Interactive Transactions"
  // See: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions-in-preview
  const correctMovie = await randomMovie()

  if (!correctMovie) {
    throw new ValidationError('No movies')
  }

  const year = getYear(parseISO(correctMovie.releasedOn.toString()))

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

  const game = {
    playId: gamePlay.id,
    playerId: gamePlay.playerId,
    year,
    choices: possibleMovies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        photoPath: movie.photoPath,
      }
    }),
  }

  logger.debug({ query: game }, `Game ${gamePlay.id} for ${year}`)
  logger.debug(
    { query: { id: correctMovie.id, title: correctMovie.title } },
    `The correct answer for ${gamePlay.id} and the ${year} is this movie`
  )

  return game
}

// Ideally this would be in a transaction, but may have to do some checks
// that data is valid to go the the next step
// Or use the preview Prisma feature "Interactive Transactions"
// See: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions-in-preview
// Note: Don't pass in player, but get from currentUser
export const answerGame = async ({ input }) => {
  const { playId, playerId, answeredMovieId } = input

  if (!playId) {
    throw new ValidationError('Missing play')
  }

  logger.debug(
    { query: { playId, playerId, answeredMovieId } },
    'answerGame input params'
  )
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

  if (!currentPlay) {
    throw new ValidationError('Nothing to play.')
  }

  if (unansweredPlays.length === 0) {
    throw new ValidationError('The play has already been answered.')
  }

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

  logger.debug(
    {
      query: {
        playId,
        playerId,
        answeredMovieId,
      },
    },
    'answerGame input params'
  )

  logger.debug({ query: { answered, correctness } }, 'answered')

  return answered
}
