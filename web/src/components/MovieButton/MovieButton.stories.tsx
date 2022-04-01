import MovieButton from './MovieButton'
import { standard } from '../GameCell/GameCell.mock'

export const generated = () => {
  return (
    <MovieButton
      onClick={() => alert('Click!')}
      movie={standard().game.choices[0]}
    />
  )
}

export default { title: 'Components/MovieButton' }
