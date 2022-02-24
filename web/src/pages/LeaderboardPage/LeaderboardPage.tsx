import { MetaTags } from '@redwoodjs/web'

import LeaderboardCell from 'src/components/LeaderboardCell'

const LeaderboardPage = () => {
  return (
    <>
      <MetaTags title="Leaderboard" description="Leaderboard page" />

      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>
      <LeaderboardCell />
    </>
  )
}

export default LeaderboardPage
