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
        updatedAt: '2022-02-19T23:28:39Z',
        playId: scenario.possibleMovie.two.playId,
        movieId: scenario.possibleMovie.two.movieId,
      },
    })

    expect(result.updatedAt).toEqual('2022-02-19T23:28:39Z')
    expect(result.playId).toEqual(scenario.possibleMovie.two.playId)
    expect(result.movieId).toEqual(scenario.possibleMovie.two.movieId)
  })

  scenario('updates a possibleMovie', async (scenario: StandardScenario) => {
    const original = await possibleMovie({ id: scenario.possibleMovie.one.id })
    const result = await updatePossibleMovie({
      id: original.id,
      input: { updatedAt: '2022-02-20T23:28:39Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-20T23:28:39Z')
  })

  scenario('deletes a possibleMovie', async (scenario: StandardScenario) => {
    const original = await deletePossibleMovie({
      id: scenario.possibleMovie.one.id,
    })
    const result = await possibleMovie({ id: original.id })

    expect(result).toEqual(null)
  })
})
