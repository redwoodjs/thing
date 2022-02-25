import Leader from './Leader'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  const leader = standard().leaderboard[6]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export const firstPlace = () => {
  const leader = standard().leaderboard[0]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export const secondPlace = () => {
  const leader = standard().leaderboard[1]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export const thirdPlace = () => {
  const leader = standard().leaderboard[2]
  return <Leader leader={leader} playerId={leader.playerId} />
}

export default { title: 'Components/Leader' }
