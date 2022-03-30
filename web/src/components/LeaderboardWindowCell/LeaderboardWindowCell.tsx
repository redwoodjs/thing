import type { Leaderboard } from 'types/graphql'
import type { CellFailureProps } from '@redwoodjs/web'
import LeaderboardTable from 'src/components/LeaderboardTable'

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

export const Success = ({
  leaderboard,
  playerId = undefined,
}: {
  leaderboard: [Leaderboard]
  playerId?: string | undefined
}) => {
  return <LeaderboardTable leaderboard={leaderboard} playerId={playerId} />
}
