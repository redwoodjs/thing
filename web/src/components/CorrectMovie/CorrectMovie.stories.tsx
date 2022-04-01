import CorrectMovie from './CorrectMovie'
import { standard } from '../GameCell/GameCell.mock'

export const correct = () => {
  return (
    <CorrectMovie
      movie={standard().answeredCorrectly.correctMovie}
      showIcon={false}
    />
  )
}

export const correctWithIcon = () => {
  return <CorrectMovie movie={standard().answeredCorrectly.correctMovie} />
}

export default { title: 'Components/CorrectMovie' }
