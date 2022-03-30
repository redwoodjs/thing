import LeaderboardPage from './LeaderboardPage'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

export const generated = () => {
  return (
    <PlayerContextProvider>
      <LeaderboardPage />
    </PlayerContextProvider>
  )
}

export default { title: 'Pages/LeaderboardPage' }
