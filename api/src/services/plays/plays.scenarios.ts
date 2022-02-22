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
            photoPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            tmdbId: 22581,
            title: 'Escape From L.A.',
            releasedOn: '2022-02-20T00:22:28Z',
            photoPath: 'String',
          },
        },
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
            photoPath: 'String',
          },
        },
        answeredMovie: {
          create: {
            tmdbId: 5490791,
            title: 'Prince of Darkness',
            releasedOn: '2022-02-20T00:22:28Z',
            photoPath: 'String',
          },
        },
      },
    },
    unanswered: {
      data: {
        player: {
          create: { name: 'Smurfette' },
        },
        correctMovie: {
          create: {
            tmdbId: 77931,
            title: 'The Smurfs 2',
            releasedOn: '2013-07-31T00:00:00Z',
            photoPath: 'String',
          },
        },
        answeredMovie: undefined,
      },
    },
  },
})

export type StandardScenario = typeof standard
