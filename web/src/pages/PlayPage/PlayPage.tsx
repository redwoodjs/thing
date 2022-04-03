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

  let timer

  const t = useRef(timer)

  useEffect(() => {
    if (showPrevious) {
      t.current = setTimeout(() => {
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

      <div className="bg-gray-800 rounded-lg">
        {showPrevious && (
          <div className="p-8">
            <AnsweredGame play={answeredGame} />
            <div className="text-center p-4">
              <button
                className="px-12 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  clearTimeout(t.current)
                  setShowPrevious(false)
                  gameContext.setIsPlaying(true)
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        {!showPrevious && (
          <div>
            <GameCell
              setAnsweredGame={(play) => {
                setShowPrevious(true)
                setAnsweredGame(play)
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default PlayPage
