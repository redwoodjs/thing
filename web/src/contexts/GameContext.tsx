import React, { useReducer, createContext, useCallback } from 'react'
import { useInterval } from 'src/hooks/useInterval'

export interface GameState {
  streak: number
  correct: number
  incorrect: number
  isPlaying: boolean
  countdown: number
}

export interface GameContextProps {
  state: GameState
  correctAnswer: () => void
  incorrectAnswer: () => void
  setIsPlaying: (isPlaying: boolean) => void
}

const GameContext = createContext<GameContextProps | undefined>(undefined)

function stateReducer(state: GameState, newState: Partial<GameState>) {
  return { ...state, ...newState }
}

export const GameContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, {
    streak: 0,
    correct: 0,
    incorrect: 0,
    isPlaying: false,
    countdown: 10,
  })

  const correctAnswer = useCallback(() => {
    setState({ correct: state.correct + 1, streak: state.streak + 1 })
  }, [state])

  const incorrectAnswer = useCallback(() => {
    setState({ incorrect: state.incorrect + 1, streak: 0 })
  }, [state])

  useInterval(() => {
    if (!state.isPlaying) {
      return
    }

    if (state.countdown === 0) {
      setState({ isPlaying: false })
    } else {
      setState({ countdown: state.countdown - 1 })
    }
  }, 1000)

  const setIsPlaying = useCallback(
    (isPlaying: boolean) => {
      if (!state.isPlaying && isPlaying) {
        setState({ countdown: 10 })
      }

      setState({ isPlaying })
    },
    [state]
  )

  return (
    <GameContext.Provider
      value={{ state, correctAnswer, incorrectAnswer, setIsPlaying }}
    >
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
