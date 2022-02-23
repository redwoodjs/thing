import { parseISO } from 'date-fns'

import fs from 'fs'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

/**
 * Batch the `items` array into multiple, smaller array chunks for a batch size
 *
 * @param {Array} items
 * @param {Number} batchSize
 *
 * @returns {Array[]}
 */
const inBatches = (items, batchSize) => {
  const chunks = []
  items = [].concat(...items)

  while (items.length) {
    chunks.push(items.splice(0, batchSize))
  }

  return chunks
}

export default async () => {
  const movieCount = await db.movie.count()

  if (movieCount > 0) {
    console.warn(
      `Skipping seeding since there are already ${movieCount} movies in your database.`
    )

    return
  }

  const tmdbMoviesData = fs.readFileSync('./data/movies.json', 'utf8')
  const tmdbMovies = JSON.parse(tmdbMoviesData)

  console.log(`Seeding ${tmdbMovies.length} movies from TMDB data ...`)

  try {
    const movies: Prisma.MovieCreateInput[] = tmdbMovies.map((movie) => {
      return {
        tmdbId: movie.id,
        title: movie.title || movie.original_title,
        releasedOn: parseISO(movie.release_date),
        photoPath: movie.poster_path || movie.backdrop_path || '',
        overview: movie.overview,
      }
    })

    for (const batchOfMovies of inBatches(movies, 1000)) {
      console.info(`Saving ${batchOfMovies.length} movies ...`)
      console.info(`First movie in batch: '${batchOfMovies[0].title}'`)
      await db.movie.createMany({ data: batchOfMovies })
    }

    console.info(`Done!`)
  } catch (error) {
    console.warn('Something went wrong when seeding. :(')
    console.error(error)
  }
}
