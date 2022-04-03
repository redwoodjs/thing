import { useEffect } from 'react'
import { toast } from '@redwoodjs/web/toast'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

import Countdown from 'src/components/Countdown/Countdown'
import GameStats from 'src/components/GameStats/GameStats'
import MovieButton from 'src/components/MovieButton/MovieButton'
import MoviePlaceholder from 'src/components/MoviePlaceholder/MoviePlaceholder'

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
    gameStats(playerId: $playerId) {
      correct
      incorrect
      streak
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

export const Loading = () => (
  <div className='"w-full text-center opacity-0'>
    <div className="grid md:grid-cols-5 grid-cols-3 gap-2">
      <MoviePlaceholder />
      <MoviePlaceholder />
      <MoviePlaceholder />
      <MoviePlaceholder />
      <MoviePlaceholder />
    </div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  game,
  gameStats,
  setAnsweredGame,
}: CellSuccessProps) => {
  const gameContext = useGameContext()
  const playerContext = usePlayerContext()

  const countdown = gameContext.state.countdown

  const [answerGame] = useMutation(ANSWER_GAME_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },

    onCompleted: ({ play }) => {
      setAnsweredGame(play)
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
    <div className="">
      <GameStats gameStats={gameStats} />

      <div className="text-center mb-8">
        <h2 className="text-center mb-8 text-gray-200 text-2xl">
          Which movie was released in{' '}
          <span className="font-bold text-3xl px-1">{game.year}</span>?
        </h2>
        <div className="h-12">
          <Countdown countdown={countdown} />
        </div>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-3 gap-3 items-baseline">
        {game.choices.map((movie) => {
          return (
            <MovieButton
              key={movie.id}
              movie={movie}
              onClick={() =>
                onAnswerClick({
                  playId: game.playId,
                  playerId: game.playerId,
                  answeredMovieId: movie.id,
                })
              }
            />
          )
        })}
      </div>
    </div>
  )
}
