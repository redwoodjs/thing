import { Movie } from '@prisma/client'
import { db } from 'src/lib/db'

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

  // console.log(movies)

  return movies[0]
}

export const moviesForGame = async ({ id }) => {
  const movies = await db.$queryRaw<Movie[]>`WITH picked_movie AS (
    SELECT
      *
    FROM
      "Movie"
    WHERE
      id = ${id}
  ),
  movie_years AS (
    SELECT
      m.*
    FROM
      "Movie" m
    LEFT JOIN picked_movie ON m.id != picked_movie.id
  WHERE
    m. "releasedOn" BETWEEN picked_movie. "releasedOn" - Interval '4 years'
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
