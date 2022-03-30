import { render } from '@redwoodjs/testing/web'

import GameStats from './GameStats'
import { GameContextProvider } from '../../contexts/GameContext'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GameStats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GameContextProvider>
          <GameStats />
        </GameContextProvider>
      )
    }).not.toThrow()
  })
})
