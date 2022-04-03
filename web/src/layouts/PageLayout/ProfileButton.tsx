import { useAuth } from '@redwoodjs/auth'
import { NavLink, routes } from '@redwoodjs/router'
import PlayerNameCell from 'src/components/PlayerNameCell'
import SignInButton from 'src/components/SignIn/SignInButton'
import { usePlayerContext } from 'src/contexts/PlayerContext'

const ProfileButton = () => {
  const { isAuthenticated, logOut } = useAuth()
  const playerContext = usePlayerContext()

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-blue-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

      {!isAuthenticated ? (
        <SignInButton className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
          <span className="flex items-center space-x-5">
            {playerContext.state.playerId ? (
              <PlayerNameCell id={playerContext.state.playerId} />
            ) : (
              <span className="text-indigo-400 group-hover:text-gray-100 transition duration-200">
                Sign In
              </span>
            )}
          </span>
        </SignInButton>
      ) : playerContext.state.playerId ? (
        <NavLink
          activeClassName=""
          to={routes.profile()}
          className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
        >
          <PlayerNameCell id={playerContext.state.playerId} />
        </NavLink>
      ) : (
        <button
          className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
          onClick={() => {
            playerContext.setState({ playerId: undefined })
            logOut()
          }}
        >
          <span className="flex items-center space-x-5">
            <span className="text-indigo-400 group-hover:text-gray-100 transition duration-200">
              Sign Out
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default ProfileButton
