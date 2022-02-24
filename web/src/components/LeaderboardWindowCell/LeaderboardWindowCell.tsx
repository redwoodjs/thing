import type { Leaderboards } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Leaderboard from 'src/components/Leaderboard'

let currentPlayerId

export const beforeQuery = ({ playerId }) => {
  currentPlayerId = playerId
  return { variables: { playerId } }
}

export const QUERY = gql`
  query LeaderboardWindow($playerId: String!) {
    leaderboard: leaderboardWindow(playerId: $playerId) {
      playerId
      player {
        id
        name
        gravatarHash
      }
      correctTotal
      incorrectTotal
      unansweredTotal
      playedTotal
      place
      leaderboardRowNumber
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ leaderboard }: CellSuccessProps<Leaderboards>) => {
  return <Leaderboard leaderboard={leaderboard} playerId={currentPlayerId} />
}
