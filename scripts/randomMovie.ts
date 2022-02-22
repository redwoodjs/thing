// To access your database
// Append api/* to import from api and web/* to import from web
import { randomMovie } from 'api/src/services/games/games'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const movie = await randomMovie()

  console.log(movie)
}
