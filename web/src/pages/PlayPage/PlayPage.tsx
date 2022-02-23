import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'

import GameCell from 'src/components/GameCell'
import PreviousPlayCell from 'src/components/PreviousPlayCell'

const PlayPage = () => {
  const [previousPlayId, setPreviousPlayId] = useState('')

  return (
    <>
      <MetaTags title="Play" description="Play page" />

      <h1 className="text-xl text-center pb-12">Play!</h1>
      <div className="pb-12">
        <GameCell setPreviousPlayId={setPreviousPlayId} />
      </div>
      <PreviousPlayCell id={previousPlayId} />
    </>
  )
}

export default PlayPage
