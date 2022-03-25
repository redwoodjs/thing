import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { Form, PasswordField, Submit, TextField } from '@redwoodjs/forms'
import { Dialog } from '@headlessui/react'
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
  const [isOpen, setIsOpen] = useState(false)

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
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Sign up
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
          <div className="relative bg-white rounded max-w-lg mx-auto w-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <Dialog.Title className="text-3xl font-semibold">
                  Sign Up
                  {/* <h3 className="text-3xl font-semibold">Sign Up</h3> */}
                </Dialog.Title>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <Dialog.Description>
                  Create an account to claim your highscores
                </Dialog.Description>
                <Form onSubmit={onSubmit}>
                  <label htmlFor="emailAddress" className="block mt-4">
                    Email Address
                  </label>
                  <TextField
                    name="emailAddress"
                    validation={{ required: true }}
                  />

                  <label htmlFor="password" className="block mt-4">
                    Password
                  </label>
                  <PasswordField
                    name="password"
                    validation={{ required: true }}
                  />

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
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default SignUp
