import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Toaster } from '@redwoodjs/web/toast'

import PlayerNameCell from 'src/components/PlayerNameCell'
import { usePlayerContext } from 'src/contexts/PlayerContext'
import SignInButton from 'src/components/SignIn/SignInButton'

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  const playerContext = usePlayerContext()

  return (
    <div className="relative bg-white">
      <Toaster toastOptions={{ success: { duration: 10000 } }} />
      <div
        className="hidden lg:block lg:absolute lg:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
          width={640}
          height={784}
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            y={72}
            width={640}
            height={640}
            className="text-gray-50"
            fill="currentColor"
          />
          <rect
            x={118}
            width={404}
            height={784}
            fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
          />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <nav
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full w-auto">
              <Link to={routes.home()}>
                <span className="sr-only">Home</span>
                <img className="h-8 w-auto sm:h-10" src="./logo.png" alt="" />
              </Link>
            </div>
            <div className="ml-5 space-x-5 md:ml-10 md:space-x-10">
              <Link
                to={routes.rules()}
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Rules
              </Link>
              <Link
                to={routes.leaderboard()}
                href="#leaderboard"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Leaderboard
              </Link>
              {isAuthenticated && (
                <Link
                  to={routes.profile()}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  Profile
                </Link>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
              {!isAuthenticated ? (
                <SignInButton className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                  {playerContext.state.playerId ? (
                    <PlayerNameCell id={playerContext.state.playerId} />
                  ) : (
                    <>Sign In</>
                  )}
                </SignInButton>
              ) : playerContext.state.playerId ? (
                <Link
                  to={routes.profile()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                >
                  <PlayerNameCell id={playerContext.state.playerId} />
                </Link>
              ) : (
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  onClick={() => {
                    playerContext.setState({ playerId: undefined })
                    logOut()
                  }}
                >
                  Sign Out
                </button>
              )}
            </span>
          </div>
        </nav>
        <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default PageLayout
