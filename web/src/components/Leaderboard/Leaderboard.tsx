import Leader from 'src/components/Leader'

const Leaderboard = ({ leaderboard, playerId }) => {
  return (
    <div>
      <div className="grid grid-cols-6 gap-1 font-bold bg-gray-100 p-2">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5">
            <span>Place</span>
          </span>
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5">
            <span>Name</span>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="pl-2">Correct</span>
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
            <span className="pl-2">Incorrect</span>
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="pl-2">Unanswered</span>
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="pl-2">Played</span>
          </span>
        </div>
      </div>

      {leaderboard?.map((leader) => {
        return (
          <Leader key={leader.playerId} leader={leader} playerId={playerId} />
        )
      })}
    </div>
  )
}

export default Leaderboard
