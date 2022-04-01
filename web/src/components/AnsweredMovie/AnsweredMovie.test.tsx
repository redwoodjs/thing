import { render } from '@redwoodjs/testing/web'
import { standard } from '../GameCell/GameCell.mock'

import AnsweredMovie from './AnsweredMovie'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnsweredMovie', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AnsweredMovie movie={standard().answeredIncorrectly.answeredMovie} />
      )
    }).not.toThrow()
  })
})
