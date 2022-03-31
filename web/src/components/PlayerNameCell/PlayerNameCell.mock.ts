import { standard as leaderboards } from '../LeaderboardWindowCell/LeaderboardWindowCell.mock'

export const standard = (/* vars, { ctx, req } */) => ({
  player: leaderboards().leaderboard[0].player,
})
