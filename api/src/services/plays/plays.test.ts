import {
  plays,
  play,
  //createPlay,
  updatePlay,
  deletePlay,
} from './plays'
import type { StandardScenario as PlayStandardScenarios } from './plays.scenarios'

// import { movie } from '../movies/movies'
// import { player } from '../players/players'

describe('plays', () => {
  scenario('returns all plays', async (scenario: PlayStandardScenarios) => {
    const result = await plays()

    expect(result.length).toEqual(Object.keys(scenario.play).length)
  })

  scenario('returns a single play', async (scenario: PlayStandardScenarios) => {
    const result = await play({ id: scenario.play.correct.id })

    expect(result).toEqual(scenario.play.correct)
  })

  // scenario('creates a play', async (scenario: PlayStandardScenarios) => {
  //   // const result = await createPlay({
  //   //   input: {
  //   //     // playerId,
  //   //     // correctMovieId,
  //   //   },
  //   // })
  //   // expect(result.updatedAt).toEqual('2022-02-19T22:17:43Z')
  //   // expect(result.playerId).toEqual(scenario.play.two.playerId)
  //   // expect(result.correctness).toEqual(true)
  // })

  scenario('updates a play', async (scenario: PlayStandardScenarios) => {
    const original = await play({ id: scenario.play.one.id })
    const result = await updatePlay({
      id: original.id,
      input: { updatedAt: '2022-02-20T22:17:43Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-20T22:17:43Z')
  })

  scenario('deletes a play', async (scenario: PlayStandardScenarios) => {
    const original = await deletePlay({ id: scenario.play.one.id })
    const result = await play({ id: original.id })

    expect(result).toEqual(null)
  })
})
