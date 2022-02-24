import HomePage from './HomePage'
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

export const generated = () => {
  return (
    <ClerkAuthProvider>
      <HomePage />
    </ClerkAuthProvider>
  )
}

export default { title: 'Pages/HomePage' }
