import {
  players,
  player,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from './players'
import type { StandardScenario as PlayerStandardScenario } from './players.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('players', () => {
  scenario('returns all players', async (scenario: PlayerStandardScenario) => {
    const result = await players()

    expect(result.length).toEqual(Object.keys(scenario.player).length)
  })

  scenario(
    'returns a single player',
    async (scenario: PlayerStandardScenario) => {
      const result = await player({ id: scenario.player.jed.id })

      expect(result).toEqual(scenario.player.jed)
    }
  )

  scenario('creates a player', async () => {
    const result = await createPlayer({
      input: { name: 'Donald Moffat' },
    })

    expect(result.name).toEqual('Donald Moffat')
  })

  scenario('updates a player', async (scenario: PlayerStandardScenario) => {
    const original = await player({ id: scenario.player.kurt.id })
    const result = await updatePlayer({
      id: original.id,
      input: { name: 'Snake Plissken' },
    })

    expect(result.name).toEqual('Snake Plissken')
  })

  scenario('deletes a player', async (scenario: PlayerStandardScenario) => {
    const original = await deletePlayer({ id: scenario.player.wilford.id })
    const result = await player({ id: original.id })

    expect(result).toEqual(null)
  })
})
