import { render } from '@redwoodjs/testing/web'

import LeaderboardPage from './LeaderboardPage'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LeaderboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PlayerContextProvider>
          <LeaderboardPage />
        </PlayerContextProvider>
      )
    }).not.toThrow()
  })
})
