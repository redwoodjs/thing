import { parseISO } from 'date-fns'

import { movies, movie, createMovie, updateMovie, deleteMovie } from './movies'
import type { StandardScenario as MovieStandardScenario } from './movies.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('movies', () => {
  scenario('returns all movies', async (scenario: MovieStandardScenario) => {
    const result = await movies()

    expect(result.length).toEqual(Object.keys(scenario.movie).length)
  })

  scenario(
    'returns a single movie',
    async (scenario: MovieStandardScenario) => {
      const result = await movie({ id: scenario.movie.trouble.id })

      expect(result).toEqual(scenario.movie.trouble)
    }
  )

  scenario('creates a movie', async () => {
    const result = await createMovie({
      input: {
        name: 'The Fog',
        releasedOn: '1980-01-01T00:00:00Z',
      },
    })

    expect(result.name).toEqual('The Fog')
    expect(result.releasedOn).toEqual(parseISO('1980-01-01T00:00:00Z'))
  })

  scenario('updates a movie', async (scenario: MovieStandardScenario) => {
    const original = await movie({ id: scenario.movie.precinct.id })
    const result = await updateMovie({
      id: original.id,
      input: { name: 'Assault On Precinct Thirteen' },
    })

    expect(result.name).toEqual('Assault On Precinct Thirteen')
  })

  scenario('deletes a movie', async (scenario: MovieStandardScenario) => {
    const original = await deleteMovie({ id: scenario.movie.escape.id })
    const result = await movie({ id: original.id })

    expect(result).toEqual(null)
  })
})
