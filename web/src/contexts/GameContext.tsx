import React, { useReducer, createContext, useCallback } from 'react'

export interface GameState {
  streak: number
  correct: number
  incorrect: number
}

export interface GameContextProps {
  state: GameState
  correctAnswer: () => void
  incorrectAnswer: () => void
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
  })

  const correctAnswer = useCallback(() => {
    setState({ correct: state.correct + 1, streak: state.streak + 1 })
  }, [state])

  const incorrectAnswer = useCallback(() => {
    setState({ incorrect: state.incorrect + 1, streak: 0 })
  }, [state])

  return (
    <GameContext.Provider value={{ state, correctAnswer, incorrectAnswer }}>
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
