import {
  possibleMovies,
  possibleMovie,
  createPossibleMovie,
  updatePossibleMovie,
  deletePossibleMovie,
} from './possibleMovies'
import type { StandardScenario } from './possibleMovies.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('possibleMovies', () => {
  scenario('returns all possibleMovies', async (scenario: StandardScenario) => {
    const result = await possibleMovies()

    expect(result.length).toEqual(Object.keys(scenario.possibleMovie).length)
  })

  scenario(
    'returns a single possibleMovie',
    async (scenario: StandardScenario) => {
      const result = await possibleMovie({ id: scenario.possibleMovie.one.id })

      expect(result).toEqual(scenario.possibleMovie.one)
    }
  )

  scenario('creates a possibleMovie', async (scenario: StandardScenario) => {
    const result = await createPossibleMovie({
      input: {
        playId: scenario.possibleMovie.two.playId,
        movieId: scenario.possibleMovie.two.movieId,
      },
    })

    expect(result.playId).toEqual(scenario.possibleMovie.two.playId)
    expect(result.movieId).toEqual(scenario.possibleMovie.two.movieId)
  })

  scenario('updates a possibleMovie', async (scenario: StandardScenario) => {
    const original = await possibleMovie({ id: scenario.possibleMovie.one.id })
    const anotherPossibleMovie = await possibleMovie({
      id: scenario.possibleMovie.two.id,
    })

    const result = await updatePossibleMovie({
      id: original.id,
      input: { movieId: anotherPossibleMovie.movieId },
    })

    expect(result.movieId).toEqual(anotherPossibleMovie.movieId)
  })

  scenario('deletes a possibleMovie', async (scenario: StandardScenario) => {
    const original = await deletePossibleMovie({
      id: scenario.possibleMovie.one.id,
    })
    const result = await possibleMovie({ id: original.id })

    expect(result).toEqual(null)
  })
})
