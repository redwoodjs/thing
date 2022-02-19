import { plays, play, createPlay, updatePlay, deletePlay } from './plays'
import type { StandardScenario } from './plays.scenarios'

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
    const result = await createPlay({
      input: {
        updatedAt: '2022-02-19T22:17:43Z',
        playerId: scenario.play.two.playerId,
        correctness: true,
      },
    })

    expect(result.updatedAt).toEqual('2022-02-19T22:17:43Z')
    expect(result.playerId).toEqual(scenario.play.two.playerId)
    expect(result.correctness).toEqual(true)
  })

  scenario('updates a play', async (scenario: StandardScenario) => {
    const original = await play({ id: scenario.play.one.id })
    const result = await updatePlay({
      id: original.id,
      input: { updatedAt: '2022-02-20T22:17:43Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-20T22:17:43Z')
  })

  scenario('deletes a play', async (scenario: StandardScenario) => {
    const original = await deletePlay({ id: scenario.play.one.id })
    const result = await play({ id: original.id })

    expect(result).toEqual(null)
  })
})
