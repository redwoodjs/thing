import AnsweredMovie from './AnsweredMovie'
import { standard } from '../GameCell/GameCell.mock'

export const incorrect = () => {
  return (
    <AnsweredMovie
      movie={standard().answeredIncorrectly.answeredMovie}
      showIcon={false}
    />
  )
}

export const incorrectWithIcon = () => {
  return <AnsweredMovie movie={standard().answeredIncorrectly.answeredMovie} />
}

export default { title: 'Components/AnsweredMovie' }
