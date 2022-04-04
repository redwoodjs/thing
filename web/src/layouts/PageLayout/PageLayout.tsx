import { NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import ProfileButton from './ProfileButton'

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
            className="relative flex items-center justify-between pt-6 pb-8 px-4 sm:px-6 nav-gradient"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                {/* Home button/icon */}
                <NavLink
                  to={routes.home()}
                  activeClassName=""
                  className="relative top-[-4px]"
                >
                  <span className="sr-only">Home</span>
                  <img className="w-auto h-10" src="./logo.png" alt="" />
                </NavLink>

                {/* Mobile menu open button */}
                <div className="relative group -mr-2 flex items-center md:hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-blue-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <Popover.Button className="relative bg-black rounded-md p-2 inline-flex items-center justify-center text-indigo-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              {/* Desktop menu items */}
              <div className="hidden md:block md:ml-10 md:space-x-10 neon-green text-3xl font-sacramento">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={routes[item.page]()}
                    activeClassName="font-bold text-white hover:text-gray-900"
                    className="font-medium text-gray-200 hover:text-white"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="hidden md:block text-right">
              <ProfileButton />
            </div>
          </nav>

          {/* Mobile menu */}
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
              <div className="rounded-lg shadow-md bg-red-900 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <NavLink
                    to={routes.home()}
                    activeClassName=""
                    className="relative top-[-4px]"
                  >
                    <span className="sr-only">Home</span>
                    <img className="h-10 w-auto" src="./logo.png" alt="" />
                  </NavLink>

                  {/* Mobile menu close button */}
                  <div className="relative group -mr-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-blue-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Popover.Button className="relative bg-black rounded-md p-2 inline-flex items-center justify-center text-indigo-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1 neon-green text-3xl font-sacramento">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={routes[item.page]()}
                      activeClassName="block px-3 py-2 font-bold text-white hover:text-gray-900"
                      className="block px-3 py-2 font-medium text-gray-200 hover:text-white"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <ProfileButton />
                {/* <div className="relative group m-3">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-blue-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <button
                    className="relative w-full px-4 py-3 md:py-2 bg-black text-center rounded-lg"
                    onClick={() => {
                      console.log('Sign Out')
                    }}
                  >
                    <span className="flex items-center space-x-5">
                      <span className="text-indigo-400 group-hover:text-gray-100 transition duration-200 w-full">
                        Sign Out
                      </span>
                    </span>
                  </button>
                </div> */}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main className="mt-4 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default PageLayout
