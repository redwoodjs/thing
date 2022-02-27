import { render } from '@redwoodjs/testing/web'

import GameStats from './GameStats'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GameStats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameStats />)
    }).not.toThrow()
  })
})
