import React, { useReducer, createContext } from 'react'

export interface PlayerState {
  playerId?: string
  playerName: string
}

export interface PlayerContextProps {
  state: PlayerState
  setState: (newState: Partial<PlayerState>) => void
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined)

function stateReducer(state: PlayerState, newState: Partial<PlayerState>) {
  return { ...state, ...newState }
}

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, {
    playerId: undefined,
    playerName: '',
  })

  return (
    <PlayerContext.Provider value={{ state, setState }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayerContext() {
  const playerContext = React.useContext(PlayerContext)

  if (playerContext === undefined) {
    throw new Error(
      'usePlayerContext must be used within a PlayerContextProvider'
    )
  }

  return playerContext
}
