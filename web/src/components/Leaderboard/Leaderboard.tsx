import Leader from 'src/components/Leader'

const Leaderboard = ({ leaderboard }) => {
  return (
    <div>
      <div className="grid grid-cols-6 gap-1 font-bold bg-gray-200 p-2">
        <div>Place</div>
        <div>Name</div>
        <div className="text-center">Correct</div>
        <div className="text-center">Incorrect</div>
        <div className="text-center">Unanswered</div>
        <div className="text-center">Played</div>
      </div>

      {leaderboard?.map((leader) => {
        return <Leader key={leader.playerId} leader={leader} />
      })}
    </div>
  )
}

export default Leaderboard
