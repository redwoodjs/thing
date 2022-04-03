import AnsweredGame from './AnsweredGame'
import { standard, skipped } from '../GameCell/GameCell.mock'

export const missing = () => {
  return <AnsweredGame play={null} />
}

export const answeredCorrectly = () => {
  return <AnsweredGame play={standard().answeredCorrectly} />
}

export const answeredIncorrectly = () => {
  return <AnsweredGame play={standard().answeredIncorrectly} />
}

export const unanswered = () => {
  return <AnsweredGame play={standard().skipped} />
}

export default { title: 'Components/AnsweredGame' }
