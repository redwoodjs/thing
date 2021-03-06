import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PossibleMovieCreateArgs>({
  possibleMovie: {
    one: {
      data: {
        play: {
          create: {
            player: {
              create: { name: 'Arnie Cunningham' },
            },
            correctMovie: {
              create: {
                tmdbId: 17814,
                title: 'Assault on Precinct 13',
                photoPath: '/3PlUJaWvR0Nr261rqsI6XvaKM4T.jpg',
                overview:
                  "L.A.'s deadliest street gang just declared war on the cops.",
                releasedOn: '1976-11-05T00:00:00Z',
              },
            },
            answeredMovie: {
              create: {
                title: 'The Fog',
                tmdbId: 1,
                photoPath: 'jhpg',
                releasedOn: '1980-01-01T00:00:00Z',
              },
            },
          },
        },
        movie: {
          create: {
            tmdbId: 8769,
            title: 'Christine',
            photoPath: '/bWi3Cjg8gkf5h3xgU91CVtxkjUc.jpg',
            overview: "How do you kill something that can't possibly be alive?",
            releasedOn: '1983-05-11T00:00:00Z',
          },
        },
      },
    },
    two: {
      data: {
        play: {
          create: {
            player: {
              create: { name: 'Mark Shermin' },
            },
            correctMovie: {
              create: {
                tmdbId: 9663,
                title: 'Starman',
                photoPath: '/zzJkJ7xhwrJrh0m4p8AEkKSKzUj.jpg',
                overview:
                  "In 1977 Voyager II was launched into space, inviting all lifeforms in the universe to visit our planet. Get ready. Company's coming.",
                releasedOn: '1984-12-13T00:00:00Z',
              },
            },
            answeredMovie: {
              create: {
                tmdbId: 6978,
                title: 'Big Trouble in Little China',
                photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
                overview: "Adventure doesn't come any bigger!",
                releasedOn: '1986-05-30T00:00:00Z',
              },
            },
          },
        },
        movie: {
          create: {
            tmdbId: 1091,
            title: 'The Thing',
            photoPath: '/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
            overview: '"Man is The Warmest Place to Hide.',
            releasedOn: '1982-06-25T00:00:00Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
