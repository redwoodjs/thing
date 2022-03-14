import { render } from '@redwoodjs/testing/web'

import SignUp from './SignUp'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignUp', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUp />)
    }).not.toThrow()
  })
})
