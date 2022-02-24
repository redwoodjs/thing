import Leaderboard from './Leaderboard'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  return <Leaderboard leaderboard={standard().leaderboard} playerId={null} />
}

export default { title: 'Components/Leaderboard' }
