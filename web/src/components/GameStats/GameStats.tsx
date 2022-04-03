// import { useGameContext } from 'src/contexts/GameContext'

const GameStats = ({ gameStats }) => {
  // const gameContext = useGameContext()

  return (
    <div className="m-4 p-4 rounded-lg border-4 border-solid border-gray-500 bg-gray-100">
      <div className="grid grid-cols-3 gap-1 font-bold bg-gray-100 p-2">
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="pl-2">Right</span>
          </span>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="pl-2">Wrong</span>
          </span>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <span className="pl-2">Longest Streak</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 font-bold bg-white p-2">
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {gameStats?.correct || 0}
          </span>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
            {gameStats?.incorrect || 0}
          </span>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {gameStats?.streak || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameStats
