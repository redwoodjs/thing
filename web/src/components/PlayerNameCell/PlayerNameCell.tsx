import type { FindPlayerQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Gravatar from '../Gravatar/Gravatar'

export const QUERY = gql`
  query FindPlayerQuery($id: String!) {
    player(id: $id) {
      id
      name
      gravatarHash
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ player }: CellSuccessProps<FindPlayerQuery>) => {
  return (
    <div style={{ lineHeight: '1px' }}>
      <span className="pr-2">
        <Gravatar player={player} size="20px" />
      </span>
      <span className="relative top-[2px] text-indigo-400 group-hover:text-gray-100 transition duration-200">
        {player.name}
      </span>
    </div>
  )
}
