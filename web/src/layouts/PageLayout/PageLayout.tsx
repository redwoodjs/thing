import { NavLink, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Toaster } from '@redwoodjs/web/toast'
import ProfileButton from './ProfileButton'

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative">
      <Toaster toastOptions={{ success: { duration: 10000 } }} />
      <div
        className="hidden lg:block lg:absolute lg:inset-0"
        aria-hidden="true"
      ></div>
      <div className="relative pb-16 sm:pb-24 lg:pb-32">
        <nav
          className="relative flex items-center justify-between pt-6 pb-8 px-4 sm:px-6 nav-gradient"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-auto">
              <NavLink
                to={routes.home()}
                activeClassName=""
                className="relative top-[-4px]"
              >
                <span className="sr-only">Home</span>
                <img className="h-8 w-auto sm:h-10" src="./logo.png" alt="" />
              </NavLink>
            </div>
            <div className="ml-5 space-x-5 md:ml-10 md:space-x-10 neon-green text-3xl font-sacramento">
              <NavLink
                activeClassName="font-bold text-blue hover:text-gray-900"
                to={routes.play()}
                className="font-medium text-gray-200 hover:text-white"
              >
                Play
              </NavLink>
              <NavLink
                activeClassName="font-bold text-blue hover:text-gray-900"
                to={routes.rules()}
                className="font-medium text-gray-200 hover:text-white"
              >
                Rules
              </NavLink>
              <NavLink
                activeClassName="font-bold text-white hover:text-gray-900"
                to={routes.leaderboard()}
                className="font-medium text-gray-200 hover:text-white"
              >
                Leaderboard
              </NavLink>
              <NavLink
                activeClassName="font-bold text-gray-900 hover:text-gray-900"
                to={routes.about()}
                className="font-medium text-gray-200 hover:text-white"
              >
                About
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  activeClassName="font-bold text-gray-900 hover:text-gray-900"
                  to={routes.profile()}
                  className="font-medium text-gray-200 hover:text-white"
                >
                  Profile
                </NavLink>
              )}
            </div>
          </div>
          <div className="text-right">
            <ProfileButton />
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
