import { render } from '@redwoodjs/testing/web'

import PlayPage from './PlayPage'
import { GameContextProvider } from 'src/contexts/GameContext'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GameContextProvider>
          <PlayerContextProvider>
            <PlayPage />
          </PlayerContextProvider>
        </GameContextProvider>
      )
    }).not.toThrow()
  })
})
