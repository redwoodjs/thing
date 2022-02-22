import { Movie } from '@prisma/client'
import { db } from 'src/lib/db'

/**
 * randomMovie can be used to pick the correct movie when creating a new play
 *
 * It uses a sample of all movies then randomly orders
 * to pick just one randomly selected movie
 *
 * @returns A movie
 */
export const randomMovie = async () => {
  const movies = await db.$queryRaw<Movie[]>`WITH movie_sample AS (
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

  return movies[0]
}

/**
 * possiblesForMovieId returns the movies options to pick from in a play given a movie id.
 *
 * The movieId is the correct movie. It is used to pick four other
 * possible movies based on the date of the given movie.
 * Since we ask thr play to pick the year, we want to pick four possibles that are
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

export const firstMovie = async () => {
  return await db.movie.findFirst()
}
