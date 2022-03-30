import GameStats from './GameStats'
import { GameContextProvider } from '../../contexts/GameContext'

export const generated = () => {
  return (
    <GameContextProvider>
      <GameStats />
    </GameContextProvider>
  )
}

export default { title: 'Components/GameStats' }
