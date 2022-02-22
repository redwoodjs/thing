// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'

import { createNewGamePlay, answerPlay } from 'api/src/services/games/games'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const play = await createNewGamePlay()

  console.log(play, `New Play by player ${play.playerId}`)

  // get the possible picks for the play
  const moviesToPickFrom = await db.possibleMovie.findMany({
    where: { playId: play.id },
  })

  // answer the first
  const answeredMovieId = moviesToPickFrom[0].movieId

  console.log(
    `Player ${play.playerId} is guessing ${answeredMovieId} and the correct movie id is ${play.correctMovieId}`
  )

  // Note: Don't pass in player, but get from currentUser
  const answered = await answerPlay({
    playId: play.id,
    playerId: play.playerId,
    answeredMovieId,
  })

  console.log(answered, 'Your answer')
  console.log(answered.correctness, `Did you win?`)
}
