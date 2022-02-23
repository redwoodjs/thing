import { MetaTags } from '@redwoodjs/web'

import GameCell from 'src/components/GameCell'

const PlayPage = () => {
  return (
    <>
      <MetaTags title="Play" description="Play page" />

      <h1 className="text-xl text-center pb-12">Play!</h1>
      <GameCell />
    </>
  )
}

export default PlayPage
