const Leader = ({ leader }) => {
  return (
    <div
      className={
        leader.leaderboardRowNumber % 2 === 0
          ? 'grid grid-cols-6 gap-1 px-2 py-1 bg-gray-100'
          : 'grid grid-cols-6 gap-1 px-2 py-1 bg-white'
      }
    >
      <div className="">{leader.place}</div>
      <div className="font-semibold">
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
