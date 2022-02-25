import { standard as leaderboardCellStandard } from '../LeaderboardCell/LeaderboardCell.mock'

const position = 5
const windowSize = 5

export const standard = (/* vars, { ctx, req } */) => ({
  // show a window of leaders surrounding a given player
  leaderboard: leaderboardCellStandard().leaderboard.splice(
    position,
    windowSize
  ),
})
