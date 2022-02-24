import { render } from '@redwoodjs/testing/web'

import Leader from './Leader'
import { standard } from '../LeaderboardWindowCell/LeaderboardWindowCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Leader', () => {
  it('renders a leader', () => {
    const leader = standard().leaderboard[0]
    expect(() => {
      render(<Leader leader={leader} playerId={leader.playerId} />)
    }).not.toThrow()
  })
})
