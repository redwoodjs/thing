import { useSignUp, useSessionList } from '@clerk/clerk-react'
import { Form, PasswordField, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { usePlayerContext } from 'src/contexts/PlayerContext'

const UPDATE_PLAYER_MUTATION = gql`
  mutation SignUpUpdatePlayer($id: String!, $input: UpdatePlayerInput!) {
    updatePlayer(id: $id, input: $input) {
      id
    }
  }
`

const SignUp = () => {
  const signUp = useSignUp()
  const playerContext = usePlayerContext()

  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION)

  const onSubmit = ({ emailAddress, password }) => {
    signUp
      .create({ emailAddress, password })
      .then((signUpAttempt) => {
        signUpAttempt
          .prepareEmailAddressVerification({
            strategy: 'email_code',
          })
          .then((data) => {
            console.log('data', data)
          })
      })
      .catch((error) => {
        console.log('error', error.errors)
      })
  }

  const onSubmitCode = (data) => {
    console.log('data', data)

    signUp
      .attemptEmailAddressVerification({ code: data.code })
      .then((data) => {
        const session = window.Clerk.client.sessions.find(
          (session) => session.id === data.createdSessionId
        )

        if (!session?.user.id || !playerContext.state.playerId) {
          // Reload window to update auth
          window.location.reload()
        }

        updatePlayer({
          variables: {
            id: playerContext.state.playerId,
            input: {
              clerkId: session?.user.id,
            },
          },
        })
          .then((data) => {
            console.log('data', data)
          })
          .catch((error) => {
            console.error('error', error)
          })
          .finally(() => {
            // Reload window to update auth
            window.location.reload()
          })
      })
      .catch((error) => {
        console.log('error', error.errors)
      })
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <Form onSubmit={onSubmit}>
        <label htmlFor="emailAddress" className="block mt-4">
          Email Address
        </label>
        <TextField name="emailAddress" validation={{ required: true }} />

        <label htmlFor="password" className="block mt-4">
          Password
        </label>
        <PasswordField name="password" validation={{ required: true }} />

        <Submit className="block mt-4">Sign Up</Submit>
      </Form>

      <Form onSubmit={onSubmitCode}>
        <label htmlFor="code" className="block mt-4">
          Sign Up Code
        </label>
        <TextField name="code" validation={{ required: true }} />

        <Submit className="block mt-4">Verify Code</Submit>
      </Form>
    </div>
  )
}

export default SignUp
