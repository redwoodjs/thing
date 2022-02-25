import Gravatar from 'src/components/Gravatar/Gravatar'

const Leader = ({ leader, playerId }) => {
  if (!leader) {
    return <></>
  }

  return (
    <div
      className={
        leader.leaderboardRowNumber % 2 === 0
          ? 'grid grid-cols-6 gap-1 px-2 py-1 bg-gray-100 p-2 items-center'
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
        {leader.place}
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
      <div className="text-center">{leader.correctTotal}</div>
      <div className="text-center">{leader.incorrectTotal}</div>
      <div className="text-center">{leader.unansweredTotal}</div>
      <div className="text-center">{leader.playedTotal}</div>
    </div>
  )
}

export default Leader
