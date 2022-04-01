import { render } from '@redwoodjs/testing/web'

import Countdown from './Countdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Countdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Countdown />)
    }).not.toThrow()
  })
})
