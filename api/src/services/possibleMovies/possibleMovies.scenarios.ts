import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PossibleMovieCreateArgs>({
  possibleMovie: {
    one: {
      data: {
        updatedAt: '2022-02-20T00:22:55Z',
        play: {
          create: {
            updatedAt: '2022-02-20T00:22:55Z',
            player: {
              create: { updatedAt: '2022-02-20T00:22:55Z', name: 'String' },
            },
            correctMovie: {
              create: {
                updatedAt: '2022-02-20T00:22:55Z',
                tmdbId: 9990486,
                title: 'String',
                releasedOn: '2022-02-20T00:22:55Z',
                posterPath: 'String',
              },
            },
            answeredMovie: {
              create: {
                updatedAt: '2022-02-20T00:22:55Z',
                tmdbId: 5935016,
                title: 'String',
                releasedOn: '2022-02-20T00:22:55Z',
                posterPath: 'String',
              },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-20T00:22:55Z',
            tmdbId: 4736355,
            title: 'String',
            releasedOn: '2022-02-20T00:22:55Z',
            posterPath: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-20T00:22:55Z',
        play: {
          create: {
            updatedAt: '2022-02-20T00:22:55Z',
            player: {
              create: { updatedAt: '2022-02-20T00:22:55Z', name: 'String' },
            },
            correctMovie: {
              create: {
                updatedAt: '2022-02-20T00:22:55Z',
                tmdbId: 5678682,
                title: 'String',
                releasedOn: '2022-02-20T00:22:55Z',
                posterPath: 'String',
              },
            },
            answeredMovie: {
              create: {
                updatedAt: '2022-02-20T00:22:55Z',
                tmdbId: 7550648,
                title: 'String',
                releasedOn: '2022-02-20T00:22:55Z',
                posterPath: 'String',
              },
            },
          },
        },
        movie: {
          create: {
            updatedAt: '2022-02-20T00:22:55Z',
            tmdbId: 7936700,
            title: 'String',
            releasedOn: '2022-02-20T00:22:55Z',
            posterPath: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
