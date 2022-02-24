import {
  leaderboards,
  leaderboardWindow,
  playerLeaderboard,
} from './leaderboards'
import type { StandardScenario as LeaderboardStandardScenario } from './leaderboards.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leaderboards', () => {
  scenario('returns all leaderboards', async () => {
    const result = await leaderboards()

    expect(result.length).toBeGreaterThan(0)
  })

  scenario(
    'gets the top player',
    async (scenario: LeaderboardStandardScenario) => {
      const allLeaders = await leaderboards()

      const allPlayerIds = [
        scenario.play.one.playerId,
        scenario.play.two.playerId,
      ]

      const topPlayerId = allLeaders[0].playerId

      expect(allPlayerIds).toContain(topPlayerId)
    }
  )

  scenario(
    'gets the leaderboard score for a given player',
    async (scenario: LeaderboardStandardScenario) => {
      const playerId = scenario.play.one.playerId

      const scores = await playerLeaderboard({
        playerId,
      })

      expect(scores.playerId).toEqual(playerId)
      expect(scores.incorrectTotal).toEqual(0)
      expect(scores.correctTotal).toEqual(1)
      expect(scores.playedTotal).toEqual(1)
      expect(scores.unansweredTotal).toEqual(0)
      expect(scores.place).toBeGreaterThan(0)
      expect(scores.leaderboardRowNumber).toBeGreaterThan(0)
    }
  )

  scenario(
    'gets the leaderboard window for a given player',
    async (scenario: LeaderboardStandardScenario) => {
      const playerId = scenario.play.one.playerId

      const leaderboard = await leaderboardWindow({
        playerId,
      })

      expect(leaderboard.length).toBeGreaterThan(0)
    }
  )
})
