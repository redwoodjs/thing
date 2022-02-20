// Leaders are an aggregation of Plays
import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayCreateArgs>({
  play: {
    one: {
      data: {
        player: {
          create: { name: 'Jack Burton' },
        },
        correctMovie: {
          create: {
            tmdbId: 1250121,
            title: 'They Live',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            tmdbId: 22581,
            title: 'Escape From L.A.',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        correctness: true,
      },
    },
    two: {
      data: {
        player: {
          create: { name: 'Laurie Strode' },
        },
        correctMovie: {
          create: {
            tmdbId: 8205318,
            title: 'Halloween',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            tmdbId: 5490791,
            title: 'Prince of Darkness',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        correctness: false,
      },
    },
  },
})

export type StandardScenario = typeof standard
