import { render } from '@redwoodjs/testing/web'
import { standard } from '../GameCell/GameCell.mock'

import MovieButton from './MovieButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MovieButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MovieButton movie={standard().game.choices[0]} />)
    }).not.toThrow()
  })
})
