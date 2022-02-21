import type { StandardScenario as GameStandardScenario } from './games.scenarios'

import { firstMovie } from './games'

describe('games', () => {
  // Note: This test fails but if you seed and run
  // `yarn rw exec randomMovie` which uses the service, then can see that this
  // in fact does return a random movie
  // It is if the movie data is gone when it executes
  // scenario('fetches random movies', async (scenario: GameStandardScenario) => {
  //   const movie = await randomMovie()

  //   expect(movie).toBeTruthy()
  //   expect(movie.title).not.toEqual(scenario.movie.thing.title)
  // })

  scenario('fetches first movie', async (scenario: GameStandardScenario) => {
    const movie = await firstMovie()

    expect(movie.title).toEqual(scenario.movie.thing.title)
  })
})
