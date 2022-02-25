import Gravatar from './Gravatar'

import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  return <Gravatar leader={standard().leaderboard[3]} />
}

export default { title: 'Components/Gravatar' }
