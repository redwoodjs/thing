import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PossibleMovieCreateArgs>({
  possibleMovie: {
    one: {
      data: {
        updatedAt: '2022-02-19T23:28:39Z',
        play: {
          create: {
            updatedAt: '2022-02-19T23:28:39Z',
            player: {
              create: { updatedAt: '2022-02-19T23:28:39Z', name: 'String' },
            },
            correctMovie: {
              create: {
                updatedAt: '2022-02-19T23:28:39Z',
                name: 'String',
                releasedOn: '2022-02-19T23:28:39Z',
              },
            },
            answeredMovie: {
              create: {
                updatedAt: '2022-02-19T23:28:39Z',
                name: 'String',
                releasedOn: '2022-02-19T23:28:39Z',
              },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-19T23:28:39Z',
            name: 'String',
            releasedOn: '2022-02-19T23:28:39Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-19T23:28:39Z',
        play: {
          create: {
            updatedAt: '2022-02-19T23:28:39Z',
            player: {
              create: { updatedAt: '2022-02-19T23:28:39Z', name: 'String' },
            },
            correctMovie: {
              create: {
                updatedAt: '2022-02-19T23:28:39Z',
                name: 'String',
                releasedOn: '2022-02-19T23:28:39Z',
              },
            },
            answeredMovie: {
              create: {
                updatedAt: '2022-02-19T23:28:39Z',
                name: 'String',
                releasedOn: '2022-02-19T23:28:39Z',
              },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-19T23:28:39Z',
            name: 'String',
            releasedOn: '2022-02-19T23:28:39Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
