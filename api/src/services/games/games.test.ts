import type { StandardScenario as GameStandardScenario } from './games.scenarios'

import {
  possiblesForMovieId,
  randomMovie,
  createNewGamePlay,
  answerPlay,
} from './games'

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
      const play = await createNewGamePlay()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(play).toBeTruthy()
      expect(play.playerId).toBeTruthy()
      expect(allMovieIds).toContain(play.correctMovieId)
      expect(play.answeredMovieId).toBeNull()
      expect(play.correctness).toBeNull()
    }
  )

  scenario(
    'Simulates a correct answer',
    async (scenario: GameStandardScenario) => {
      const play = await createNewGamePlay()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(play).toBeTruthy()
      expect(play.playerId).toBeTruthy()
      expect(allMovieIds).toContain(play.correctMovieId)
      expect(play.answeredMovieId).toBeNull()
      expect(play.correctness).toBeNull()

      const answeredMovieId = play.correctMovieId

      const answered = await answerPlay({
        playId: play.id,
        playerId: play.playerId,
        answeredMovieId,
      })

      expect(answered).toBeTruthy()
      expect(answered.playerId).toBeTruthy()
      expect(allMovieIds).toContain(play.correctMovieId)
      expect(answered.answeredMovieId).toEqual(answeredMovieId)
      expect(answered.correctness).toEqual(true)
    }
  )

  scenario(
    'Simulates a wrong answer',
    async (scenario: GameStandardScenario) => {
      const play = await createNewGamePlay()

      const allMovieIds = [
        scenario.movie.starman.id,
        scenario.movie.escape.id,
        scenario.movie.trouble.id,
        scenario.movie.thing.id,
        scenario.movie.precinct.id,
        scenario.movie.christine.id,
      ]

      expect(play).toBeTruthy()
      expect(play.playerId).toBeTruthy()
      expect(allMovieIds).toContain(play.correctMovieId)
      expect(play.answeredMovieId).toBeNull()
      expect(play.correctness).toBeNull()

      const answeredMovieId = allMovieIds.filter(
        (id) => id != play.correctMovieId
      )[0]

      const answered = await answerPlay({
        playId: play.id,
        playerId: play.playerId,
        answeredMovieId,
      })

      expect(answered).toBeTruthy()
      expect(answered.playerId).toBeTruthy()
      expect(allMovieIds).toContain(play.correctMovieId)
      expect(answered.answeredMovieId).toEqual(answeredMovieId)
      expect(answered.correctness).toEqual(false)
    }
  )
})
