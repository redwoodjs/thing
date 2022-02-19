import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    kurt: { data: { name: 'Kurt Russell' } },
    adrienne: {
      data: { name: 'Adrienne Barbeau' },
    },
    jed: {
      data: { name: 'Jed (The Dog)' },
    },
    john: {
      data: { name: 'John Carpenter' },
    },
    wilford: {
      data: { name: 'Wilford Brimley' },
    },
    keith: {
      data: { name: 'Keith David' },
    },
  },
})

export type StandardScenario = typeof standard
