import Gravatar from './Gravatar'

import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

export const generated = () => {
  return <Gravatar player={standard().leaderboard[3].player} />
}

export default { title: 'Components/Gravatar' }
