import Gravatar from 'src/components/Gravatar/Gravatar'

const Leader = ({ leader, playerId }) => {
  if (!leader) {
    return <></>
  }

  let placeColors = 'bg-gray-100 text-gray-800'

  switch (leader.place) {
    case 1:
      placeColors = 'bg-blue-100 text-blue-800'
      break
    case 2:
      placeColors = 'bg-purple-100 text-purple-800'
      break
    case 3:
      placeColors = 'bg-pink-100 text-pink-800'
      break
    default:
      placeColors = 'bg-gray-100 text-gray-800'
  }

  return (
    <div
      className={
        leader.leaderboardRowNumber % 2 === 0
          ? 'grid grid-cols-6 gap-1 px-2 py-1 bg-gray-50 p-2 items-center'
          : 'grid grid-cols-6 gap-1 px-2 py-1 bg-white p-2 items-center'
      }
    >
      <div
        className={
          leader.place <= 3 || playerId == leader.playerId
            ? 'font-bold'
            : 'font-normal'
        }
      >
        <span
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${placeColors}`}
        >
          {leader.place <= 3 && (
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          )}
          {leader.place > 3 && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
          )}
          <span className="pl-2">{leader.place}</span>
        </span>
      </div>
      <div className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <Gravatar leader={leader} />
          </div>
          <div className="ml-3">
            <p
              className={
                playerId === leader.playerId
                  ? 'font-bold text-gray-800 group-hover:text-gray-900'
                  : 'font-medium text-gray-700 group-hover:text-gray-900'
              }
            >
              {leader.player.name}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        {' '}
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {leader.correctTotal}
        </span>
      </div>
      <div className="text-center">
        {' '}
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
          {leader.incorrectTotal}
        </span>
      </div>
      <div className="text-center">
        {' '}
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {leader.unansweredTotal}
        </span>
      </div>
      <div className="text-center">
        {' '}
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {leader.playedTotal}
        </span>
      </div>
    </div>
  )
}

export default Leader
