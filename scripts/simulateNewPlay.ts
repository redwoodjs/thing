// To access your database
// Append api/* to import from api and web/* to import from web
import { randomMovie, possiblesForMovieId } from 'api/src/services/games/games'
import { createPlayer } from 'api/src/services/players/players'
import { createPlay } from 'api/src/services/plays/plays'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const correctMovie = await randomMovie()
  const possibleMovies = await possiblesForMovieId({ movieId: correctMovie.id })
  const player = await createPlayer({ input: { name: 'Player' } })

  const possibleMoviesIds = possibleMovies.map((movie) => {
    return { movieId: movie.id }
  })

  const play = await createPlay({
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

  console.log(play)
}
