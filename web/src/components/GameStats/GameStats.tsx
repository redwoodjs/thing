// import { useGameContext } from 'src/contexts/GameContext'

const GameStats = ({ gameStats }) => {
  // const gameContext = useGameContext()

  return (
    <div>
      <h2>Game Stats</h2>
      <dl>
        <dt>Correct</dt>
        <dd>{gameStats?.correct}</dd>
        <dt>Incorrect</dt>
        <dd>{gameStats?.incorrect}</dd>
        <dt>Streak</dt>
        <dd>{gameStats?.streak}</dd>
      </dl>
    </div>
  )
}

export default GameStats
