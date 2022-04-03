import React, { useReducer, createContext, useCallback } from 'react'
import { useInterval } from 'src/hooks/useInterval'

export const COUNTDOWN_SECONDS = 17
export const CONTINUE_PLAY_SECONDS = 7

export interface GameState {
  isPlaying: boolean
  countdown: number
}

export interface GameContextProps {
  state: GameState
  setIsPlaying: (isPlaying: boolean) => void
}

const GameContext = createContext<GameContextProps | undefined>(undefined)

function stateReducer(state: GameState, newState: Partial<GameState>) {
  return { ...state, ...newState }
}

export const GameContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, {
    isPlaying: false,
    countdown: COUNTDOWN_SECONDS,
  })

  useInterval(() => {
    if (!state.isPlaying) {
      return
    }

    if (state.countdown === 0) {
      setState({ isPlaying: false })
    } else {
      setState({ countdown: state.countdown - 1 })
    }
  }, 1_000)

  // extract to variable so we can use this in the useCallback dependency array
  // below. If we used `state.isPlaying` inside the callback we would have to
  // have `state` as a dependency, and then the callback would be regenerated
  // every second when countdown was updated. We don't want/need that.
  const stateIsPlaying = state.isPlaying

  const setIsPlaying = useCallback(
    (isPlaying: boolean) => {
      if (!stateIsPlaying && isPlaying) {
        setState({ countdown: COUNTDOWN_SECONDS })
      }

      setState({ isPlaying })
    },
    [stateIsPlaying]
  )

  return (
    <GameContext.Provider value={{ state, setIsPlaying }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const gameContext = React.useContext(GameContext)

  if (gameContext === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider')
  }

  return gameContext
}
