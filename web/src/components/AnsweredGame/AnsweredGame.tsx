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
      <div className="mt-4">
        {play.correctness && (
          <div>
            <h4 className="text-xl font-bold text-center">Nice! 🎉 </h4>
            <CorrectMovie movie={play.correctMovie} />
          </div>
        )}
        {!play.correctness && (
          <div>
            <h4 className="text-xl font-bold text-center">Sorry 😢</h4>
            {play.answeredMovie ? (
              <AnsweredMovie movie={play.answeredMovie} />
            ) : (
              <div className="flex mt-4 p-6 bg-purple-100 rounded-lg">
                <p className="text-center w-full">No answer given in time</p>
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
