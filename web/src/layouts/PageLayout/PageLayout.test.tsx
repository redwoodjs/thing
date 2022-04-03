import { ClerkProvider, withClerk } from '@clerk/clerk-react'
import { render } from '@redwoodjs/testing/web'

import PageLayout from './PageLayout'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

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

describe('PageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ClerkAuthProvider>
          <PlayerContextProvider>
            <PageLayout />
          </PlayerContextProvider>
        </ClerkAuthProvider>
      )
    }).not.toThrow()
  })
})
