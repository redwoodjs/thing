import type { Play } from 'types/graphql'

import CorrectMovie from 'src/components/CorrectMovie/CorrectMovie'
import AnsweredMovie from 'src/components/AnsweredMovie/AnsweredMovie'

interface Props {
  play: Play | undefined
  showMovies?: boolean
}

const AnsweredGame = ({ play }: Props) => {
  if (!play) {
    return null
  }

  return (
    <div className="pointer-events-none">
      <div className="">
        {play.correctness && (
          <div>
            <CorrectMovie movie={play.correctMovie} />
          </div>
        )}
        {!play.correctness && (
          <div>
            {play.answeredMovie ? (
              <AnsweredMovie movie={play.answeredMovie} />
            ) : (
              <div className="flex mt-4 p-6 bg-yellow-100 rounded-lg border-solid border-4 border-yellow-500">
                <p className="text-center w-full animate-pulse text-xl font-bold">
                  No answer given in time
                </p>
              </div>
            )}

            <CorrectMovie movie={play.correctMovie} showIcon={false} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AnsweredGame
