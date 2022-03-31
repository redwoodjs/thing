import { ClerkProvider, withClerk } from '@clerk/clerk-react'
import { PlayerContext } from 'src/contexts/PlayerContext'

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

import SignInButton from './SignInButton'

export const generated = () => {
  return (
    <PlayerContext>
      <ClerkAuthProvider>
        <SignInButton>Sign In</SignInButton>
      </ClerkAuthProvider>
    </PlayerContext>
  )
}

export default { title: 'Components/SignInButton' }
