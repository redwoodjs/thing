import { movies, movie, createMovie, updateMovie, deleteMovie } from './movies'
import type { StandardScenario } from './movies.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('movies', () => {
  scenario('returns all movies', async (scenario: StandardScenario) => {
    const result = await movies()

    expect(result.length).toEqual(Object.keys(scenario.movie).length)
  })

  scenario('returns a single movie', async (scenario: StandardScenario) => {
    const result = await movie({ id: scenario.movie.one.id })

    expect(result).toEqual(scenario.movie.one)
  })

  scenario('creates a movie', async () => {
    const result = await createMovie({
      input: {
        updatedAt: '2022-02-19T22:17:55Z',
        name: 'String',
        releasedOn: '2022-02-19T22:17:55Z',
      },
    })

    expect(result.updatedAt).toEqual('2022-02-19T22:17:55Z')
    expect(result.name).toEqual('String')
    expect(result.releasedOn).toEqual('2022-02-19T22:17:55Z')
  })

  scenario('updates a movie', async (scenario: StandardScenario) => {
    const original = await movie({ id: scenario.movie.one.id })
    const result = await updateMovie({
      id: original.id,
      input: { updatedAt: '2022-02-20T22:17:55Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-20T22:17:55Z')
  })

  scenario('deletes a movie', async (scenario: StandardScenario) => {
    const original = await deleteMovie({ id: scenario.movie.one.id })
    const result = await movie({ id: original.id })

    expect(result).toEqual(null)
  })
})
