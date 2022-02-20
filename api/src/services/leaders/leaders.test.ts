import { leaders } from './leaders'
import type { StandardScenario as LeaderStandardScenario } from './leaders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leaders', () => {
  scenario('returns all leaders', async (scenario: LeaderStandardScenario) => {
    const result = await leaders()

    const topPlayer = result[0]

    expect(result.length).toBeGreaterThan(0)
    expect(topPlayer.playerId).toEqual(scenario.play.one.playerId)
    expect(topPlayer._count.correctness).toEqual(1)
  })
})
