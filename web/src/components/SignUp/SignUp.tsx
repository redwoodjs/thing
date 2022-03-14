import { Form, PasswordField, Submit, TextField } from '@redwoodjs/forms'
import { useSignUp } from '@clerk/clerk-react'

const SignUp = () => {
  const signUp = useSignUp()

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
        console.log('data', data)
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
