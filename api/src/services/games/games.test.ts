import { ValidationError } from '@redwoodjs/graphql-server'

import type { StandardScenario as GameStandardScenario } from './games.scenarios'

import {
  possiblesForMovieId,
  randomMovie,
  createGame,
  answerGame,
} from './games'

import { play } from '../plays/plays'
import { db } from 'src/lib/db'

describe('games', () => {
  // Note: This test uses a larger tablesample size in test than in dev or prod
  scenario('fetches random movies', async () => {
    const movie = await randomMovie()

    expect(movie).toBeTruthy()
    expect(movie.title).toBeTruthy()
  })

  scenario(
    'fetches the five possible movies for a game play given a candidate/correct movie id',
    async (scenario: GameStandardScenario) => {
      // the rules of picking movies relies on other movies being +/- 4 years from the picked movie
      // and Starman fits in the middle of the data set
      const movieId = scenario.movie.starman.id
      const movies = await possiblesForMovieId({
        movieId,
      })

      const movieIds = movies.map((movie) => movie.id)
      expect(movies.length).toEqual(5)
      expect(movieIds).toContain(movieId)
    }
  )

  scenario(
    'Simulates a new game for a player with a correct movie and unanswered play',
    async (scenario: GameStandardScenario) => {
      const game = await createGame()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(game).toBeTruthy()
      expect(game.playerId).toBeTruthy()

      const gamePlay = await play({ id: game.playId })

      expect(allMovieIds).toContain(gamePlay.correctMovieId)
      expect(gamePlay.answeredMovieId).toBeNull()
      expect(gamePlay.correctness).toBeNull()
    }
  )

  scenario(
    'Simulates a correct answer',
    async (scenario: GameStandardScenario) => {
      const game = await createGame()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(game).toBeTruthy()
      expect(game.playerId).toBeTruthy()

      const gamePlay = await play({ id: game.playId })

      expect(allMovieIds).toContain(gamePlay.correctMovieId)
      expect(gamePlay.answeredMovieId).toBeNull()
      expect(gamePlay.correctness).toBeNull()

      const answeredMovieId = gamePlay.correctMovieId

      const answered = await answerGame({
        input: {
          playId: game.playId,
          playerId: game.playerId,
          answeredMovieId,
        },
      })

      expect(answered).toBeTruthy()
      expect(answered.playerId).toBeTruthy()
      expect(allMovieIds).toContain(gamePlay.correctMovieId)
      expect(answered.answeredMovieId).toEqual(answeredMovieId)
      expect(answered.correctness).toEqual(true)
    }
  )

  scenario(
    'Simulates a wrong answer',
    async (scenario: GameStandardScenario) => {
      const game = await createGame()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(game).toBeTruthy()
      expect(game.playerId).toBeTruthy()

      const gamePlay = await play({ id: game.playId })

      expect(allMovieIds).toContain(gamePlay.correctMovieId)
      expect(gamePlay.answeredMovieId).toBeNull()
      expect(gamePlay.correctness).toBeNull()

      const answeredMovieId = allMovieIds.filter(
        (id) => id != gamePlay.correctMovieId
      )[0]

      const answered = await answerGame({
        input: {
          playId: game.playId,
          playerId: game.playerId,
          answeredMovieId,
        },
      })

      expect(answered).toBeTruthy()
      expect(answered.playerId).toBeTruthy()
      expect(allMovieIds).toContain(gamePlay.correctMovieId)
      expect(answered.answeredMovieId).toEqual(answeredMovieId)
      expect(answered.correctness).toEqual(false)
    }
  )

  scenario(
    'When no movies to make a game',
    async (_scenario: GameStandardScenario) => {
      await db.movie.deleteMany()

      expect(async () => await createGame()).rejects.toThrow('No movies')
    }
  )

  scenario(
    'When the game has already been answered.',
    async (scenario: GameStandardScenario) => {
      const game = await createGame()

      await db.play.update({
        data: { answeredMovieId: scenario.movie.escape.id },
        where: { id: game.playId },
      })

      expect(
        async () =>
          await answerGame({
            input: {
              playId: game.playId,
              playerId: game.playerId,
              answeredMovieId: scenario.movie.escape.id,
            },
          })
      ).rejects.toThrow('Nothing to play.')
    }
  )

  scenario(
    'When the game does not belong to the current user.',
    async (scenario: GameStandardScenario) => {
      const game = await createGame()
      const otherPlayer = await db.player.create({
        data: { name: 'Some other player' },
      })

      expect(
        async () =>
          await answerGame({
            input: {
              playId: game.playId,
              playerId: otherPlayer.id,
              answeredMovieId: scenario.movie.escape.id,
            },
          })
      ).rejects.toThrow('Nothing to play.')
    }
  )
})
