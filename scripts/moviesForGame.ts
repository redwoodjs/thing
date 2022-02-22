// To access your database
// Append api/* to import from api and web/* to import from web
import { moviesForGame } from 'api/src/services/games/games'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const movies = await moviesForGame({
    id: '011de4c7-529c-4813-ad62-b964f09bce82',
  })

  console.log(movies)
}
