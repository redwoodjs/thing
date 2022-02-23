import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'

import GameCell from 'src/components/GameCell'
import PreviousPlay from 'src/components/PreviousPlay'

const PlayPage = () => {
  const [previousPlay, setPreviousPlay] = useState<any>()
  const [showPrevious, setShowPrevious] = useState(false)

  useEffect(() => {
    console.log('useEffect showPrevious', showPrevious)
    if (showPrevious) {
      setTimeout(() => {
        console.log('hide PreviousPlay')
        setShowPrevious(false)
      }, 3000)
    }
  }, [showPrevious])

  return (
    <>
      <MetaTags title="Play" description="Play page" />

      <h1 className="text-xl text-center pb-12">Play!</h1>
      <div className="relative">
        <div
          className={
            'absolute inset-0 pointer-events-none z-10 transition ' +
            (showPrevious ? 'opacity-100' : 'opacity-0')
          }
        >
          <PreviousPlay play={previousPlay} />
        </div>
        <div className={'z-0 ' + (showPrevious ? 'invisible' : 'visible')}>
          <GameCell
            setPreviousPlay={(play) => {
              setPreviousPlay(play)
              setShowPrevious(true)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default PlayPage
