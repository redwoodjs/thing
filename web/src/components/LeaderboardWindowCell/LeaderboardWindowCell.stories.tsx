import { Loading, Empty, Failure, Success } from './LeaderboardWindowCell'
import { standard } from './LeaderboardWindowCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? (
    <Success
      leaderboard={standard().leaderboard}
      playerId={standard().leaderboard[2].playerId}
    />
  ) : null
}

export default { title: 'Cells/LeaderboardWindowCell' }
