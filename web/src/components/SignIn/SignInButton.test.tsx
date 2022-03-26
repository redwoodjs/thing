import { render } from '@redwoodjs/testing/web'

import SignInButton from './SignInButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignUp', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignInButton>Sign In</SignInButton>)
    }).not.toThrow()
  })
})
