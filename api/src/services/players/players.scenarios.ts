import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: { data: { updatedAt: '2022-02-19T22:17:48Z', name: 'String' } },
    two: { data: { updatedAt: '2022-02-19T22:17:48Z', name: 'String' } },
  },
})

export type StandardScenario = typeof standard
