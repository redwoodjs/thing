import { ClerkProvider, withClerk } from '@clerk/clerk-react'

const ClerkAuthConsumer = withClerk(({ children, clerk }) => {
  return React.cloneElement(children as React.ReactElement, {
    client: clerk,
  })
})

const ClerkAuthProvider = ({ children }) => {
  const frontendApi = process.env.CLERK_FRONTEND_API_URL
  if (!frontendApi) {
    throw new Error('Need to define env variable CLERK_FRONTEND_API_URL')
  }

  return (
    <ClerkProvider frontendApi={frontendApi}>
      <ClerkAuthConsumer>{children}</ClerkAuthConsumer>
    </ClerkProvider>
  )
}

import { render } from '@redwoodjs/testing/web'

import SignInButton from './SignInButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignInButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ClerkAuthProvider>
          <SignInButton>Sign In</SignInButton>
        </ClerkAuthProvider>
      )
    }).not.toThrow()
  })
})
