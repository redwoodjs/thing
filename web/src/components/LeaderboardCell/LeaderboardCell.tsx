import type { Leaderboards } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import LeaderboardTable from 'src/components/LeaderboardTable'

export const QUERY = gql`
  query Leaderboards {
    leaderboard: leaderboards {
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
  return <LeaderboardTable leaderboard={leaderboard} playerId={null} />
}
