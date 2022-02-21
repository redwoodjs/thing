import { MovieDb } from 'moviedb-promise'
import { MovieResult } from 'moviedb-promise/dist/request-types'

import { logger } from './logger'

/**
 * The Movie Database api client
 *
 * @see https://developers.themoviedb.org/3/getting-started/introduction
 */
const moviedb = new MovieDb(process.env.TMDB_API_KEY)

const tmdbError = (name) => {
  const e = new Error(name)
  e.name = name
  return Promise.reject(e)
}

/**
 * @see https://developers.themoviedb.org/3/discover/movie-discover
 * @param query
 * @returns JSON of movies
 */
export const discoverMovieForYear = async ({ year, numPages = 5 }) => {
  const movies = [] as Array<MovieResult>
  for (let page = 1; page <= numPages; page++) {
    try {
      const res = await moviedb.discoverMovie({
        primary_release_year: year,
        include_adult: false,
        region: 'US',
        sort_by: 'popularity.desc',
        page,
      })

      res.results.forEach((movie) => {
        movies.push(movie)
      })
    } catch (error) {
      return tmdbError(error)
    }
  }

  return movies
}

/**
 * @see https://developers.themoviedb.org/3/discover/movie-discover
 * @param query
 * @returns JSON of movies
 */
export const discoverMoviesForYears = async ({
  startYear = new Date().getFullYear(),
  yearsAgo = 5,
  numPages = 2,
}) => {
  const movies = [] as Array<MovieResult>

  for (
    let primary_release_year = startYear;
    primary_release_year > startYear - yearsAgo;
    primary_release_year--
  ) {
    console.log(`Fetching popular movies for ${primary_release_year} ...`)
    for (let page = 1; page <= numPages; page++) {
      try {
        const res = await moviedb.discoverMovie({
          primary_release_year,
          include_adult: false,
          region: 'US',
          sort_by: 'popularity.desc',
          page,
        })

        console.log(
          `Fetched ${
            res.results.length * page
          } movies for ${primary_release_year} ...`
        )

        res.results.forEach((movie) => {
          movies.push(movie)
        })
      } catch (error) {
        return tmdbError(error)
      }

      console.log(`Fetched ${movies.length} total movies ...`)
    }
  }

  return movies
}

/**
 * @see https://developers.themoviedb.org/3/search/search-companies
 * @param query
 * @returns JSON of movies
 */
export const searchMovie = async ({ query }) => {
  try {
    const res = await moviedb.searchMovie({
      query,
      include_adult: false,
      region: 'US',
    })
    return res.results
  } catch (error) {
    return tmdbError(error)
  }
}

/**
 *
 * @see https://developers.themoviedb.org/3/search/search-people
 * @param query
 * @returns
 */
export const searchPerson = async ({ query }) => {
  try {
    const res = await moviedb.searchPerson({
      query,
      include_adult: false,
      region: 'US',
    })
    return res.results
  } catch (error) {
    return tmdbError(error)
  }
}
