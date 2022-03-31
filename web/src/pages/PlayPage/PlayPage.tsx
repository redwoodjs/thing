import { MetaTags } from '@redwoodjs/web'
import { useEffect, useRef, useState } from 'react'

import GameCell from 'src/components/GameCell'
import AnsweredGame from 'src/components/AnsweredGame'

import type { Play } from 'types/graphql'
import { useGameContext, CONTINUE_PLAY_SECONDS } from 'src/contexts/GameContext'

const PlayPage = () => {
  const [answeredGame, setAnsweredGame] = useState<Play>()
  const [showPrevious, setShowPrevious] = useState(false)
  const gameContext = useGameContext()

  const firstLoad = useRef(true)

  useEffect(() => {
    if (showPrevious) {
      setTimeout(() => {
        setShowPrevious(false)
        gameContext.setIsPlaying(true)
      }, CONTINUE_PLAY_SECONDS * 1_000)
    }
  }, [showPrevious, gameContext])

  useEffect(() => {
    // Immediately start playing on page load
    if (firstLoad.current) {
      firstLoad.current = false
      gameContext.setIsPlaying(true)
    }
  }, [gameContext])

  return (
    <>
      <MetaTags title="Play" description="Play page" />

      <div className="relative">
        <div
          className={
            'absolute inset-0 pointer-events-none z-10 transition ' +
            (showPrevious ? 'opacity-100' : 'opacity-0')
          }
        >
          <AnsweredGame play={answeredGame} />
        </div>
        <div className={'z-0 ' + (showPrevious ? 'invisible' : 'visible')}>
          <GameCell
            setAnsweredGame={(play) => {
              setShowPrevious(true)
              setAnsweredGame(play)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default PlayPage
