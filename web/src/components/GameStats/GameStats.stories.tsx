import GameStats from './GameStats'
import { GameContextProvider } from '../../contexts/GameContext'

export const generated = () => {
  return (
    <GameContextProvider>
      <GameStats gameStats={{ correct: 10, incorrect: 5, streak: 2 }} />
    </GameContextProvider>
  )
}

export default { title: 'Components/GameStats' }
