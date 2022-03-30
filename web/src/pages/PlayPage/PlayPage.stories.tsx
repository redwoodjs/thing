import PlayPage from './PlayPage'
import { GameContextProvider } from 'src/contexts/GameContext'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

export const generated = () => {
  return (
    <GameContextProvider>
      <PlayerContextProvider>
        <PlayPage />
      </PlayerContextProvider>
    </GameContextProvider>
  )
}

export default { title: 'Pages/PlayPage' }
