import Leader from './Leader'
import { standard } from '../LeaderboardWindowCell/LeaderboardWindowCell.mock'

export const generated = () => {
  const leader = standard().leaderboard[0]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export default { title: 'Components/Leader' }
