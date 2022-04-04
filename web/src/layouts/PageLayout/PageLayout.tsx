import { NavLink, routes } from '@redwoodjs/router'
// import { useAuth } from '@redwoodjs/auth'
import { Toaster } from '@redwoodjs/web/toast'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
// import ProfileButton from './ProfileButton'

const navigation = [
  {
    name: 'Play',
    page: 'play',
  },
  {
    name: 'Rules',
    page: 'rules',
  },
  {
    name: 'Leaderboard',
    page: 'leaderboard',
  },
  {
    name: 'About',
    page: 'about',
  },
]

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  // const { isAuthenticated } = useAuth()

  return (
    <div className="relative">
      <Toaster toastOptions={{ success: { duration: 10000 } }} />
      <div
        className="hidden lg:block lg:absolute lg:inset-0"
        aria-hidden="true"
      ></div>
      <div className="relative pb-16 sm:pb-24 lg:pb-32">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between pt-6 pb-4 px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <NavLink
                  to={routes.home()}
                  activeClassName=""
                  className="relative top-[-4px]"
                >
                  <span className="sr-only">Home</span>
                  <img className="h-8 w-auto sm:h-10" src="./logo.png" alt="" />
                </NavLink>
                {/* <NavLink to={routes.home()} activeClassName="">
                  <span className="sr-only">Home</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://d33wubrfki0l68.cloudfront.net/492ed629970792d32ac857da0166a7d2308bad99/428b6/images/diecut.svg"
                    alt=""
                  />
                </NavLink> */}
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden md:block md:ml-10 md:space-x-10">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={routes[item.page]()}
                    className="font-medium text-gray-500 hover:text-gray-900"
                    activeClassName=""
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <NavLink
                  to="login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  activeClassName=""
                >
                  Log In
                </NavLink>
              </span>
            </div>
          </nav>
          <Transition
            as={React.Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={routes[item.page]()}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      activeClassName=""
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  to="login"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                  activeClassName=""
                >
                  Log in
                </NavLink>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {/* <nav
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
        </nav> */}
        <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default PageLayout
