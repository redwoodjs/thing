import { Loading, Empty, Failure, Success } from './GameCell'
import { standard } from './GameCell.mock'
import { GameContextProvider } from 'src/contexts/GameContext'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? (
    <GameContextProvider>
      <PlayerContextProvider>
        <Success {...standard()} />
      </PlayerContextProvider>
    </GameContextProvider>
  ) : null
}

export default { title: 'Cells/GameCell' }
