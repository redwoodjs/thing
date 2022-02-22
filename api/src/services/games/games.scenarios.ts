import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MovieCreateArgs>({
  movie: {
    thing: {
      data: {
        tmdbId: 1091,
        title: 'The Thing',
        photoPath: '/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
        overview: '"Man is The Warmest Place to Hide.',
        releasedOn: '1982-06-25T00:00:00Z',
      },
    },
    escape: {
      data: {
        tmdbId: 1103,
        title: 'Escape From New York',
        photoPath: '/yreqWiQ7IOkXWVB2Tz4LJIs7xqA.jpg"',
        overview:
          '1997. New York city is now a maximum security prison. Breaking out is impossible. Breaking in is insane',
        releasedOn: '1981-05-23T00:00:00Z',
      },
    },
    precinct: {
      data: {
        tmdbId: 17814,
        title: 'Assault on Precinct 13',
        photoPath: '/3PlUJaWvR0Nr261rqsI6XvaKM4T.jpg',
        overview: "L.A.'s deadliest street gang just declared war on the cops.",
        releasedOn: '1976-11-05T00:00:00Z',
      },
    },
    starman: {
      data: {
        tmdbId: 9663,
        title: 'Starman',
        photoPath: '/zzJkJ7xhwrJrh0m4p8AEkKSKzUj.jpg',
        overview:
          "In 1977 Voyager II was launched into space, inviting all lifeforms in the universe to visit our planet. Get ready. Company's coming.",
        releasedOn: '1984-12-13T00:00:00Z',
      },
    },
    trouble: {
      data: {
        tmdbId: 6978,
        title: 'Big Trouble in Little China',
        photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
        overview: "Adventure doesn't come any bigger!",
        releasedOn: '1986-05-30T00:00:00Z',
      },
    },
    christine: {
      data: {
        tmdbId: 8769,
        title: 'Christine',
        photoPath: '/bWi3Cjg8gkf5h3xgU91CVtxkjUc.jpg',
        overview: "How do you kill something that can't possibly be alive?",
        releasedOn: '1983-05-11T00:00:00Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
