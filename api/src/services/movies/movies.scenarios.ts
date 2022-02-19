import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MovieCreateArgs>({
  movie: {
    one: {
      data: {
        updatedAt: '2022-02-19T22:17:55Z',
        name: 'String',
        releasedOn: '2022-02-19T22:17:55Z',
      },
    },
    two: {
      data: {
        updatedAt: '2022-02-19T22:17:55Z',
        name: 'String',
        releasedOn: '2022-02-19T22:17:55Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
