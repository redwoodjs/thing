import {
  plays,
  play,
  createPlay,
  updatePlay,
  deletePlay,
  unansweredPlays,
} from './plays'
import type { StandardScenario } from './plays.scenarios'

import { movies } from '../movies/movies'
import { players } from '../players/players'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('plays', () => {
  scenario('returns all plays', async (scenario: StandardScenario) => {
    const result = await plays()

    expect(result.length).toEqual(Object.keys(scenario.play).length)
  })

  scenario('returns a single play', async (scenario: StandardScenario) => {
    const result = await play({ id: scenario.play.one.id })

    expect(result).toEqual(scenario.play.one)
  })

  scenario('creates a play', async (scenario: StandardScenario) => {
    const allPlayers = await players()
    const allMovies = await movies()

    const playerId = allPlayers[0].id
    const correctMovieId = allMovies[0].id
    const answeredMovieId = allMovies[0].id

    const result = await createPlay({
      input: {
        player: { connect: { id: playerId } },
        correctMovie: { connect: { id: correctMovieId } },
        answeredMovie: { connect: { id: answeredMovieId } },
        correctness: scenario.play.one.correctness,
      },
    })

    expect(result.playerId).toEqual(playerId)
    expect(result.correctMovieId).toEqual(correctMovieId)
    expect(result.answeredMovieId).toEqual(answeredMovieId)
  })

  scenario('updates a play', async (scenario: StandardScenario) => {
    const original = await play({ id: scenario.play.one.id })
    const result = await updatePlay({
      id: original.id,
      input: { correctness: true },
    })

    expect(result.correctness).toBe(true)
  })

  scenario('deletes a play', async (scenario: StandardScenario) => {
    const original = await deletePlay({ id: scenario.play.one.id })
    const result = await play({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('creates an unanswered play', async (scenario: StandardScenario) => {
    const allUnansweredPlays = await unansweredPlays()

    const unansweredPlay = allUnansweredPlays[0]

    expect(unansweredPlay).not.toBeUndefined()
    expect(unansweredPlay.playerId).toEqual(scenario.play.unanswered.playerId)
    expect(unansweredPlay.correctMovieId).toEqual(
      scenario.play.unanswered.correctMovieId
    )

    expect(unansweredPlay.answeredMovieId).toBeNull()
  })
})
