import { render } from '@redwoodjs/testing/web'

import PreviousPlay from './PreviousPlay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PreviousPlay', () => {
  it('renders successfully without a play', () => {
    expect(() => {
      render(<PreviousPlay play={null} />)
    }).not.toThrow()
  })
})
