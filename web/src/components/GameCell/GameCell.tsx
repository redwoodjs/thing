import { getYear, parseISO } from 'date-fns'

import { toast } from '@redwoodjs/web/toast'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query CreateGame {
    game: createGame {
      playId
      playerId
      year
      choices {
        id
        title
        overview
        photoPath
      }
    }
  }
`

const ANSWER_GAME_MUTATION = gql`
  mutation AnswerGame($input: AnswerGameInput!) {
    answerGame(input: $input) {
      id
      correctness
      answeredMovieId
      answeredMovie {
        id
        title
        releasedOn
        photoPath
      }
      correctMovie {
        id
        title
        releasedOn
        photoPath
      }
      possibleMovies {
        movie {
          id
          title
          releasedOn
          photoPath
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ game }: CellSuccessProps) => {
  const [answerGame] = useMutation(ANSWER_GAME_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },

    onCompleted: (data) => {
      const correctMovieMessage = `${
        data.answerGame.correctMovie.title
      } was released in ${getYear(
        parseISO(data.answerGame.correctMovie.releasedOn)
      )}`

      const answeredMovieMessage = `${
        data.answerGame.answeredMovie.title
      } which was released in ${getYear(
        parseISO(data.answerGame.answeredMovie.releasedOn)
      )}`

      let message = `${correctMovieMessage}.`

      if (!data.answerGame.correctness) {
        message += ` But, you chose ${answeredMovieMessage}.`
      }
      toast.success(
        `${data.answerGame.correctness ? 'Yes!' : 'Sorry.'} ${message}`
      )
    },
  })

  const onAnswerClick = ({ playId, playerId, answeredMovieId }) => {
    answerGame({
      variables: { input: { playId, playerId, answeredMovieId } },
    })
  }

  return (
    <div>
      <h2 className="text-center">
        Which movie was released in{' '}
        <span className="font-bold text-xl px-1">{game.year}</span>?
      </h2>
      <div className="flex items-center flex-1 justify-between w-full w-auto">
        {game.choices.map((movie) => {
          return (
            <button
              key={movie.id}
              className="w-40"
              onClick={() =>
                onAnswerClick({
                  playId: game.playId,
                  playerId: game.playerId,
                  answeredMovieId: movie.id,
                })
              }
            >
              <div className="flex flex-col">
                <h3 className="py-4">{movie.title}</h3>
                <img
                  className="drop-shadow-md"
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.photoPath}`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
