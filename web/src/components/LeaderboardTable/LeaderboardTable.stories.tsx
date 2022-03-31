import LeaderboardTable from './LeaderboardTable'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  return (
    <LeaderboardTable leaderboard={standard().leaderboard} playerId={null} />
  )
}

export const top = () => {
  return (
    <LeaderboardTable
      leaderboard={standard().leaderboard.splice(0, 4)}
      playerId={null}
    />
  )
}

export const middle = () => {
  return (
    <LeaderboardTable
      leaderboard={standard().leaderboard.splice(5, 5)}
      playerId={null}
    />
  )
}

export const tied = () => {
  return (
    <LeaderboardTable
      leaderboard={standard().leaderboard.splice(3, 5)}
      playerId={null}
    />
  )
}

export default { title: 'Components/Leaderboard' }
