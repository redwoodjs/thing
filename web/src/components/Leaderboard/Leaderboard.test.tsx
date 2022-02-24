import { render } from '@redwoodjs/testing/web'

import Leaderboard from './Leaderboard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Leaderboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Leaderboard />)
    }).not.toThrow()
  })
})
