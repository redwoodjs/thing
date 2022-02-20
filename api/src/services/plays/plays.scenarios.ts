import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayCreateArgs>({
  play: {
    one: {
      data: {
        player: {
          create: { name: 'String' },
        },
        correctMovie: {
          create: {
            updatedAt: '2022-02-20T00:22:28Z',
            tmdbId: 1250121,
            title: 'String',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            updatedAt: '2022-02-20T00:22:28Z',
            tmdbId: 22581,
            title: 'String',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
      },
    },
    two: {
      data: {
        player: {
          create: { name: 'String' },
        },
        correctMovie: {
          create: {
            updatedAt: '2022-02-20T00:22:28Z',
            tmdbId: 8205318,
            title: 'String',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            updatedAt: '2022-02-20T00:22:28Z',
            tmdbId: 5490791,
            title: 'String',
            releasedOn: '2022-02-20T00:22:28Z',
            posterPath: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
