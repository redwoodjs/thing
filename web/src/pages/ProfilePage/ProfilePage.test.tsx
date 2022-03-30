import { render } from '@redwoodjs/testing/web'

import ProfilePage from './ProfilePage'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PlayerContextProvider>
          <ProfilePage />
        </PlayerContextProvider>
      )
    }).not.toThrow()
  })
})
