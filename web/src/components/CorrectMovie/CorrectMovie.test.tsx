import { render } from '@redwoodjs/testing/web'
import { standard } from '../GameCell/GameCell.mock'

import CorrectMovie from './CorrectMovie'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CorrectMovie', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CorrectMovie movie={standard().answeredCorrectly.correctMovie} />)
    }).not.toThrow()
  })
})
