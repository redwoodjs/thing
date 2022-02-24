import AnsweredGame from './AnsweredGame'
import { standard } from '../GameCell/GameCell.mock'

export const missing = () => {
  return <AnsweredGame play={null} />
}

export const answered = () => {
  return <AnsweredGame play={standard().answeredGame} />
}

export default { title: 'Components/AnsweredGame' }
