const Leader = ({ leader, playerId }) => {
  if (!leader) {
    return <></>
  }

  return (
    <div
      className={
        leader.leaderboardRowNumber % 2 === 0
          ? 'grid grid-cols-6 gap-1 px-2 py-1 bg-gray-100'
          : 'grid grid-cols-6 gap-1 px-2 py-1 bg-white'
      }
    >
      <div className={leader.place <= 3 ? 'font-semibold' : 'font-normal'}>
        {leader.place}
      </div>
      <div
        className={
          playerId && playerId == leader.playerId
            ? 'bg-green-200 font-bold'
            : 'font-semibod'
        }
      >
        <span>{leader.player.gravatarHash}</span>
        {leader.player.name}
      </div>
      <div className="text-center">{leader.correctTotal}</div>
      <div className="text-center">{leader.incorrectTotal}</div>
      <div className="text-center">{leader.unansweredTotal}</div>
      <div className="text-center">{leader.playedTotal}</div>
    </div>
  )
}

export default Leader
