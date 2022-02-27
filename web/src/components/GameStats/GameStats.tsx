import { useGameContext } from 'src/contexts/GameContext'

const GameStats = () => {
  const gameContext = useGameContext()

  return (
    <div>
      <h2>Game Stats</h2>
      <dl>
        <dt>Correct</dt>
        <dd>{gameContext.state.correct}</dd>
        <dt>Incorrect</dt>
        <dd>{gameContext.state.incorrect}</dd>
        <dt>Streak</dt>
        <dd>{gameContext.state.streak}</dd>
      </dl>
    </div>
  )
}

export default GameStats
