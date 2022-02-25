import AnsweredGame from './AnsweredGame'
import { standard } from '../GameCell/GameCell.mock'

export const missing = () => {
  return <AnsweredGame play={null} />
}

export const answeredCorrectly = () => {
  return <AnsweredGame play={standard().answeredCorrectly} />
}

export const answeredIncorrectly = () => {
  return <AnsweredGame play={standard().answeredIncorrectly} />
}

export default { title: 'Components/AnsweredGame' }
