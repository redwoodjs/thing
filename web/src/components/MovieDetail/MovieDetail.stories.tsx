import MovieDetail from './MovieDetail'
import { standard } from '../GameCell/GameCell.mock'

export const generated = () => {
  return <MovieDetail movie={standard().answeredCorrectly.correctMovie} />
}

export default { title: 'Components/MovieDetail' }
