import { ReactNode, useState } from 'react'
import { useSignUp, useSignIn } from '@clerk/clerk-react'
import {
  Form,
  PasswordField,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
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

interface Props {
  className?: string
  children: ReactNode
}

const SignIn = ({ className, children }: Props) => {
  const signUp = useSignUp()
  const signIn = useSignIn()
  const playerContext = usePlayerContext()
  const [isOpen, setIsOpen] = useState(false)
  const [needCode, setNeedCode] = useState(false)
  const formMethods = useForm()
  const formMethodsCode = useForm()
  const [errors, setErrors] = useState([])

  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION)

  const onSubmit = ({ emailAddress, password }) => {
    signUp
      .create({ emailAddress, password })
      .then((signUpAttempt) => {
        // When we get here we know we're trying to create a new account, and
        // the user will have to enter the code sent to the provided email
        // address
        setNeedCode(true)

        signUpAttempt
          .prepareEmailAddressVerification({
            strategy: 'email_code',
          })
          .then((data) => {
            console.log('signUp data', data)
          })
      })
      .catch((e) => {
        if (e.errors.find((error) => error.code === 'form_identifier_exists')) {
          signIn
            .create({ identifier: emailAddress, password })
            .then((data) => {
              if (data.status === 'complete') {
                // Reload window to update auth
                window.location.reload()
              } else {
                console.log('signIn data', data)
              }
            })
            .catch((e) => {
              console.log('signIn e', e)
              setErrors(e.errors)
            })
        } else {
          console.log('error', e.errors)
          setErrors(e.errors)
        }
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
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded w-96 mx-auto w-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <Dialog.Title className="text-3xl font-semibold">
                  Sign In
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
              <div className="relative p-6 flex-auto">
                <Dialog.Description as="div">
                  <p>Sign in to claim your highscores.</p>
                  <p className="text-sm text-gray-500">
                    If you don&apos;t have an account, one will be created for
                    you
                  </p>
                </Dialog.Description>
                <Form formMethods={formMethods} onSubmit={onSubmit}>
                  <label htmlFor="emailAddress" className="block mt-4 w-full">
                    Email Address
                  </label>
                  <TextField
                    name="emailAddress"
                    className="w-full"
                    validation={{ required: true }}
                  />

                  <label htmlFor="password" className="block mt-4">
                    Password
                  </label>
                  <PasswordField
                    name="password"
                    className="w-full"
                    validation={{ required: true }}
                  />

                  <Submit
                    className={
                      (needCode ? 'hidden' : 'sr-only') +
                      ' mt-6 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    }
                  >
                    Sign In
                  </Submit>
                </Form>

                {needCode && (
                  <Form formMethods={formMethodsCode} onSubmit={onSubmitCode}>
                    <p className="pt-6">
                      A new account is being created. A verification code has
                      been sent to your email. Please enter it below.
                    </p>
                    <label htmlFor="code" className="block mt-4">
                      Sign Up Code
                    </label>
                    <TextField
                      name="code"
                      className="w-full"
                      validation={{ required: true }}
                    />

                    <Submit className="sr-only block mt-4">Verify Code</Submit>
                  </Form>
                )}
                {errors.map((error) => (
                  <p key={error.code} className="text-red-500 pt-6">
                    {error.message}
                  </p>
                ))}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                {needCode ? (
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => formMethodsCode.handleSubmit(onSubmitCode)()}
                  >
                    Verify Code
                  </button>
                ) : (
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => formMethods.handleSubmit(onSubmit)()}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default SignIn
