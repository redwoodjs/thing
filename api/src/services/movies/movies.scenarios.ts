import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MovieCreateArgs>({
  movie: {
    thing: {
      data: {
        name: 'The Thing',
        releasedOn: '1982-01-01T00:00:00Z',
      },
    },
    escape: {
      data: {
        name: 'Escape From New York',
        releasedOn: '1981-01-01T00:00:00Z',
      },
    },
    precinct: {
      data: {
        name: 'Assault on Precinct 13',
        releasedOn: '1976-01-01T00:00:00Z',
      },
    },
    starman: {
      data: {
        name: 'Starman',
        releasedOn: '1984-01-01T00:00:00Z',
      },
    },
    trouble: {
      data: {
        name: 'Big Trouble in Little China',
        releasedOn: '1986-01-01T00:00:00Z',
      },
    },
    christine: {
      data: {
        name: 'Christine',
        releasedOn: '1983-01-01T00:00:00Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
