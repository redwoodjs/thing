import { leaders } from './leaders'
import type { StandardScenario as LeaderStandardScenario } from './leaders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leaders', () => {
  scenario('returns all leaders', async () => {
    const result = await leaders()

    expect(result.length).toBeGreaterThan(0)
  })

  scenario('gets the top player', async (scenario: LeaderStandardScenario) => {
    const allLeaders = await leaders()

    const allPlayerIds = [
      scenario.play.one.playerId,
      scenario.play.two.playerId,
    ]

    const topPlayerId = allLeaders[0].playerId

    expect(allPlayerIds).toContain(topPlayerId)
  })
})
