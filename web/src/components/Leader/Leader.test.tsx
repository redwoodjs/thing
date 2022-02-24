import { render } from '@redwoodjs/testing/web'

import Leader from './Leader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Leader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Leader />)
    }).not.toThrow()
  })
})
