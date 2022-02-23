import fs from 'fs'
import { discoverMoviesForYears } from 'api/src/lib/tmdb'

const writeFile = ({ filename, data }) => {
  const file = `./data/${filename}.json`
  fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`)
    } else {
      console.log(`File is written successfully to ${file}!`)
    }
  })
}

/**
 * Fetch movies from the Movie Database for a series of years and saves to a
 * data file for database seeding.
 *
 * Don't forget that you need a TMDB API Key to run this.
 *
 * Usage: yarn rw exec createMovieData --yearsAgo 5 --numPages 2
 *
 * @param yearsAgo How many years back to fetch movies. Defaults to 5
 * @param numPages How many pages to fetch. Each page is 20 movies. Defaults
 *                 to 1 page
 *
 * Note this is not memory efficient since loads all data before saving.
 *
 */
export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const yearsAgo = args['yearsAgo'] || 5
  const numPages = args['numPages'] || 1

  console.log(`Saving movies for past ${yearsAgo} years ...`)
  try {
    const data = await discoverMoviesForYears({ yearsAgo, numPages })
    console.log(`Saving ${data.length} total movies ...`)
    writeFile({ filename: 'movies', data })

    console.log('Done!')
  } catch (e) {
    console.log(e)
  }
}
