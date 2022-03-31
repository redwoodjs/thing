import { MetaTags } from '@redwoodjs/web'

import LeaderboardCell from 'src/components/LeaderboardCell'
import LeaderboardWindowCell from 'src/components/LeaderboardWindowCell'
import { usePlayerContext } from 'src/contexts/PlayerContext'

const LeaderboardPage = () => {
  const playerContext = usePlayerContext()

  return (
    <>
      <MetaTags title="Leaderboard" description="Leaderboard page" />
      <section className="divide-y">
        <section className="py-4">
          <h1 className="text-xl font-bold mb-4">Leaderboard</h1>
          <p>How do you rank?</p>
        </section>
        <section className="py-4">
          <h2 className="text-xl font-bold mb-4">Me</h2>
          <LeaderboardWindowCell playerId={playerContext.state.playerId} />
        </section>
        <section className="py-4">
          <h2 className="text-xl font-bold mb-4">World</h2>
          <LeaderboardCell />
        </section>
      </section>
    </>
  )
}

export default LeaderboardPage
