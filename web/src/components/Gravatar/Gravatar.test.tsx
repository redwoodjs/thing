import { render } from '@redwoodjs/testing/web'
import { standard } from '../LeaderboardCell/LeaderboardCell.mock'

import Gravatar from './Gravatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Gravatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Gravatar leader={standard().leaderboard[3]} />)
    }).not.toThrow()
  })
})
