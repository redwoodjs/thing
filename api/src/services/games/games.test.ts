import type { StandardScenario as GameStandardScenario } from './games.scenarios'

import { possiblesForMovieId, randomMovie } from './games'

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
})
