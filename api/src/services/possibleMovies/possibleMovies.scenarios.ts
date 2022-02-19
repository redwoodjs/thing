import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PossibleMovieCreateArgs>({
  possibleMovie: {
    one: {
      data: {
        updatedAt: '2022-02-19T22:18:13Z',
        play: {
          create: {
            updatedAt: '2022-02-19T22:18:13Z',
            correctness: true,
            player: {
              create: { updatedAt: '2022-02-19T22:18:13Z', name: 'String' },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-19T22:18:13Z',
            name: 'String',
            releasedOn: '2022-02-19T22:18:13Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-19T22:18:13Z',
        play: {
          create: {
            updatedAt: '2022-02-19T22:18:13Z',
            correctness: true,
            player: {
              create: { updatedAt: '2022-02-19T22:18:13Z', name: 'String' },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-19T22:18:13Z',
            name: 'String',
            releasedOn: '2022-02-19T22:18:13Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
