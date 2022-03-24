import React, { useReducer, createContext, useEffect } from 'react'

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

interface ProviderProps {
  children: React.ReactNode
}

export const PlayerContextProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useReducer(stateReducer, {
    playerId: localStorage.getItem('playerId') || undefined,
    playerName: '',
  })

  useEffect(() => {
    if (state.playerId) {
      localStorage.setItem('playerId', state.playerId)
    } else {
      localStorage.removeItem('playerId')
    }
  }, [state])

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
