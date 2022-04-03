import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { usePlayerContext } from 'src/contexts/PlayerContext'
import { useAuth } from '@redwoodjs/auth'

const ProfilePage = () => {
  const playerContext = usePlayerContext()
  const { logOut } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <h1>ProfilePage</h1>
      <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
        <p className="text-base font-medium text-gray-900">
          Sign up to get notified when it&apos;s ready.
        </p>
        <form action="#" method="POST" className="mt-3 sm:flex">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-red-500 focus:border-red-500 sm:flex-1 border-gray-300"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            Notify me
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-500">
          We care about the protection of your data. Read our{' '}
          <Link
            to={routes.home()}
            className="font-medium text-gray-900 underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <button
        onClick={() => {
          playerContext.setState({ playerId: undefined })
          logOut()
        }}
      >
        Sign Out
      </button>
    </>
  )
}

export default ProfilePage
