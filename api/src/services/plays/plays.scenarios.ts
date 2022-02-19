import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayCreateArgs>({
  play: {
    one: {
      data: {
        updatedAt: '2022-02-19T22:17:43Z',
        correctness: true,
        player: {
          create: { updatedAt: '2022-02-19T22:17:43Z', name: 'String' },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-19T22:17:43Z',
        correctness: true,
        player: {
          create: { updatedAt: '2022-02-19T22:17:43Z', name: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
