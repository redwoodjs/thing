import Leader from './Leader'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  const leader = standard().leaderboard[6]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export default { title: 'Components/Leader' }
