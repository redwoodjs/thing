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

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const yearsAgo = args['yearsAgo'] || 5

  console.log(`Saving movies for past ${yearsAgo} years ...`)
  try {
    const data = await discoverMoviesForYears({ yearsAgo })
    console.log(`Saving ${data.length} total movies ...`)
    writeFile({ filename: 'movies', data })

    console.log('Done!')
  } catch (e) {
    console.log(e)
  }
}
