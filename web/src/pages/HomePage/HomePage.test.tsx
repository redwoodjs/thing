import { ClerkProvider, withClerk } from '@clerk/clerk-react'

import { render } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

const ClerkAuthConsumer = withClerk(({ children, clerk }) => {
  return React.cloneElement(children as React.ReactElement, {
    client: clerk,
  })
})

export const ClerkAuthProvider = ({ children }) => {
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

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ClerkAuthProvider>
          <HomePage />
        </ClerkAuthProvider>
      )
    }).not.toThrow()
  })
})
