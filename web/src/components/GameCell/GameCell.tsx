import { useEffect } from 'react'
import { toast } from '@redwoodjs/web/toast'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

import LeaderboardWindowCell from 'src/components/LeaderboardWindowCell'
import { useGameContext } from 'src/contexts/GameContext'
import { usePlayerContext } from 'src/contexts/PlayerContext'

export const beforeQuery = () => {
  // When babel does it thing this will end up inside a component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const playerContext = usePlayerContext()

  return {
    fetchPolicy: 'no-cache',
    variables: {
      playerId: playerContext.state.playerId,
    },
  }
}

export const QUERY = gql`
  query CreateGame($playerId: String) {
    game: createGame(playerId: $playerId) {
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
    play: answerGame(input: $input) {
      id
      correctness
      answeredMovieId
      answeredMovie {
        id
        title
        overview
        releasedOn
        photoPath
      }
      correctMovie {
        id
        title
        overview
        releasedOn
        photoPath
        overview
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

export const Success = ({
  game,
  setAnsweredGame,
  refetch,
}: CellSuccessProps) => {
  const gameContext = useGameContext()
  const playerContext = usePlayerContext()

  const countdown = gameContext.state.countdown

  const [answerGame] = useMutation(ANSWER_GAME_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },

    onCompleted: ({ play }) => {
      if (play.answeredMovieId === play.correctMovie.id) {
        gameContext.correctAnswer()
      } else {
        gameContext.incorrectAnswer()
      }

      setAnsweredGame(play)
      refetch()
    },
  })

  const onAnswerClick = ({ playId, playerId, answeredMovieId }) => {
    setIsPlaying(false)
    answerGame({
      variables: { input: { playId, playerId, answeredMovieId } },
    })
  }

  useEffect(() => {
    if (!playerContext.state.playerId) {
      playerContext.setState({ playerId: game.playerId })
    }
  }, [playerContext, game])

  const isPlaying = gameContext.state.isPlaying
  const setIsPlaying = gameContext.setIsPlaying

  useEffect(() => {
    if (countdown === 0 && isPlaying) {
      // Timeout! Skip this game
      answerGame({
        variables: {
          input: {
            playId: game.playId,
            playerId: game.playerId,
            answeredMovieId: undefined,
          },
        },
      })

      setIsPlaying(false)
    }
  }, [
    countdown,
    isPlaying,
    setIsPlaying,
    answerGame,
    game.playId,
    game.playerId,
  ])

  return (
    <div className="mb-4">
      <h2 className="text-center">
        Which movie was released in{' '}
        <span className="font-bold text-xl px-1">{game.year}</span>?
      </h2>
      <div className="text-center">{countdown}</div>
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
                  // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                  src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
                />
              </div>
            </button>
          )
        })}
      </div>
      <div className="py-8">
        <LeaderboardWindowCell playerId={game.playerId} />
      </div>
    </div>
  )
}
