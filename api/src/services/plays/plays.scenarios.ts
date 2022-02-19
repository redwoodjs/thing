import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayCreateArgs>({
  play: {
    one: {
      data: {
        updatedAt: '2022-02-19T23:29:35Z',
        player: {
          create: { updatedAt: '2022-02-19T23:29:35Z', name: 'String' },
        },
        correctMovie: {
          create: {
            updatedAt: '2022-02-19T23:29:35Z',
            name: 'String',
            releasedOn: '2022-02-19T23:29:35Z',
          },
        },
        answeredMovie: {
          create: {
            updatedAt: '2022-02-19T23:29:35Z',
            name: 'String',
            releasedOn: '2022-02-19T23:29:35Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-19T23:29:35Z',
        player: {
          create: { updatedAt: '2022-02-19T23:29:35Z', name: 'String' },
        },
        correctMovie: {
          create: {
            updatedAt: '2022-02-19T23:29:35Z',
            name: 'String',
            releasedOn: '2022-02-19T23:29:35Z',
          },
        },
        answeredMovie: {
          create: {
            updatedAt: '2022-02-19T23:29:35Z',
            name: 'String',
            releasedOn: '2022-02-19T23:29:35Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
