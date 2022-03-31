import ProfilePage from './ProfilePage'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

export const generated = () => {
  return (
    <PlayerContextProvider>
      <ProfilePage />
    </PlayerContextProvider>
  )
}

export default { title: 'Pages/ProfilePage' }
