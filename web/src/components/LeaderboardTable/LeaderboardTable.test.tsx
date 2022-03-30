import { render } from '@redwoodjs/testing/web'

import LeaderboardTable from './LeaderboardTable'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Leaderboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <LeaderboardTable
          leaderboard={standard().leaderboard}
          playerId={null}
        />
      )
    }).not.toThrow()
  })
})
