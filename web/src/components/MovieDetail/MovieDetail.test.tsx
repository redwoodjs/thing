import { render } from '@redwoodjs/testing/web'
import { standard } from '../GameCell/GameCell.mock'

import MovieDetail from './MovieDetail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MovieDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MovieDetail movie={standard().answeredCorrectly.correctMovie} />)
    }).not.toThrow()
  })
})
