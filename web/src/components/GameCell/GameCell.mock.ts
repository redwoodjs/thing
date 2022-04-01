// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  game: {
    playId: 'c436c2ae-b2e0-450f-b6e6-def3b240e0b3',
    year: 1993,
    choices: [
      {
        id: 'bb6132e0-110d-4a4a-b91d-3b4c82401b08',
        title: 'Courage Under Fire',
        overview:
          'A US Army officer, who made a "friendly fire" mistake that was covered up, has been reassigned to a desk job. He is tasked to investigate a female chopper commander\'s worthiness to be awarded the Medal of Honor. At first all seems in order. But then he begins to notice inconsistencies between the testimonies of the witnesses...',
        photoPath: '/2TwwHfreTH5lnhWC9f77ZKaQ98j.jpg',
      },
      {
        id: 'c1803963-ae9d-4b86-aae3-f5a67eb8d25f',
        title: 'Gattaca',
        overview:
          'In a future society in the era of indefinite eugenics, humans are set on a life course depending on their DNA. Young Vincent Freeman is born with a condition that would prevent him from space travel, yet is determined to infiltrate the GATTACA space program.',
        photoPath: '/mi8ow4MIoPvgBnWB1OKe0ph0woa.jpg',
      },
      {
        id: 'f094e9ec-bcab-4d29-a110-e2f2c8c88367',
        title: 'I Know What You Did Last Summer',
        overview:
          'As they celebrate their high school graduation, four friends are involved in a hit-and-run accident when their car hits and apparently kills a pedestrian on an isolated roadway. They dispose of the body and vow to keep the incident a secret, a year later somebody starts sending them letters bearing the warning "I Know What You Did Last Summer".',
        photoPath: '/7OfTWTQEvPcwPrOdeLH0F3h6GRZ.jpg',
      },
      {
        id: '42210972-64bd-4945-8f84-26d49c9f720c',
        title: 'Baazigar',
        overview:
          "A young man with a vendetta against a business tycoon seduces and kills his eldest daughter and then proceeds to his younger daughter but she begins to suspect her new lover's ulterior motive.",
        photoPath: '/fqFSU3hdRQKsPxJ3OYh3nyVZqY1.jpg',
      },
      {
        id: '1928fdcf-031f-4a0e-a7de-189eb20eb612',
        title: 'Darkman',
        overview:
          'Dr. Peyton Westlake is on the verge of realizing a major breakthrough in synthetic skin when his laboratory is destroyed by gangsters. Having been burned beyond recognition and forever altered by an experimental medical procedure, Westlake becomes known as Darkman, assuming alternate identities in his quest for revenge and a new life with a former love.',
        photoPath: '/mlVu8rQbnZmeBaDpeffoW9xelkL.jpg',
      },
    ],
  },
  answeredCorrectly: {
    id: 'd6b6704a-68d2-44b0-ac77-c5b27fb4ba67',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    playerId: 1,
    player: {
      id: '1',
    },
    correctness: true,
    answeredMovieId: '3cf9467b-3194-4627-98fc-847cfb9a675c',
    answeredMovie: {
      id: '3cf9467b-3194-4627-98fc-847cfb9a675c',
      title: 'Big Trouble in Little China',
      releasedOn: '1986-05-30T04:00:00.000Z',
      photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
    },
    correctMovieId: '3cf9467b-3194-4627-98fc-847cfb9a675c',
    correctMovie: {
      id: '3cf9467b-3194-4627-98fc-847cfb9a675c',
      title: 'Big Trouble in Little China',
      overview:
        "When trucker Jack Burton agreed to take his friend, Wang Chi, to pick up his fiancee at the airport, he never expected to get involved in a supernatural battle between good and evil. Wang's fiancee has emerald green eyes, which make her a perfect target for immortal sorcerer Lo Pan and his three invincible cronies. Lo Pan must marry a girl with green eyes so he can regain his physical form.",
      releasedOn: '1986-05-30T04:00:00.000Z',
      photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
    },
    possibleMovies: [
      {
        movie: {
          id: 'd42c846f-1eae-4785-9092-8184e15e52f7',
          title: 'City on Fire',
          releasedOn: '1987-02-13T05:00:00.000Z',
          photoPath: '/zO2MFwAiFoHC2mGjfxTc5JFlXGU.jpg',
        },
      },
      {
        movie: {
          id: '1040746c-ac78-41a0-8c97-2164541ea799',
          title: 'Valmont',
          releasedOn: '1989-11-17T05:00:00.000Z',
          photoPath: '/gKBCV6VzThjoVjO9GypqZMJix4J.jpg',
        },
      },
      {
        movie: {
          id: 'ebfef61a-e35a-4559-94b9-f8272f448e21',
          title: 'Jurassic Park',
          releasedOn: '1993-06-11T04:00:00.000Z',
          photoPath: '/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
        },
      },
      {
        movie: {
          id: '3cf9467b-3194-4627-98fc-847cfb9a675c',
          title: 'Big Trouble in Little China',
          releasedOn: '1986-05-30T04:00:00.000Z',
          photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
        },
      },
      {
        movie: {
          id: 'efcfb4a3-3890-4522-9b88-38198b839c20',
          title: 'Stakeout',
          releasedOn: '1987-08-05T04:00:00.000Z',
          photoPath: '/zclBzn3FBzF4i774z0mZjFQw66q.jpg',
        },
      },
    ],
  },
  answeredIncorrectly: {
    id: 'd6b6704a-68d2-44b0-ac77-c5b27fb4ba67',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    playerId: 1,
    player: {
      id: '1',
    },
    correctness: false,
    answeredMovieId: 'ebfef61a-e35a-4559-94b9-f8272f448e21',
    answeredMovie: {
      id: 'ebfef61a-e35a-4559-94b9-f8272f448e21',
      title: 'Jurassic Park',
      overview:
        'A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.',
      releasedOn: '1993-06-11T04:00:00.000Z',
      photoPath: '/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
    },
    correctMovieId: '3cf9467b-3194-4627-98fc-847cfb9a675c',
    correctMovie: {
      id: '3cf9467b-3194-4627-98fc-847cfb9a675c',
      title: 'Big Trouble in Little China',
      overview:
        "When trucker Jack Burton agreed to take his friend, Wang Chi, to pick up his fiancee at the airport, he never expected to get involved in a supernatural battle between good and evil. Wang's fiancee has emerald green eyes, which make her a perfect target for immortal sorcerer Lo Pan and his three invincible cronies. Lo Pan must marry a girl with green eyes so he can regain his physical form.",
      releasedOn: '1986-05-30T04:00:00.000Z',
      photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
    },
    possibleMovies: [
      {
        movie: {
          id: 'd42c846f-1eae-4785-9092-8184e15e52f7',
          title: 'City on Fire',
          releasedOn: '1987-02-13T05:00:00.000Z',
          photoPath: '/zO2MFwAiFoHC2mGjfxTc5JFlXGU.jpg',
        },
      },
      {
        movie: {
          id: '1040746c-ac78-41a0-8c97-2164541ea799',
          title: 'Valmont',
          releasedOn: '1989-11-17T05:00:00.000Z',
          photoPath: '/gKBCV6VzThjoVjO9GypqZMJix4J.jpg',
        },
      },
      {
        movie: {
          id: 'ebfef61a-e35a-4559-94b9-f8272f448e21',
          title: 'Jurassic Park',
          releasedOn: '1993-06-11T04:00:00.000Z',
          photoPath: '/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
        },
      },
      {
        movie: {
          id: '3cf9467b-3194-4627-98fc-847cfb9a675c',
          title: 'Big Trouble in Little China',
          releasedOn: '1986-05-30T04:00:00.000Z',
          photoPath: '/vWtOXvlcXCpb74GGfqYAnSbnm0L.jpg',
        },
      },
      {
        movie: {
          id: 'efcfb4a3-3890-4522-9b88-38198b839c20',
          title: 'Stakeout',
          releasedOn: '1987-08-05T04:00:00.000Z',
          photoPath: '/zclBzn3FBzF4i774z0mZjFQw66q.jpg',
        },
      },
    ],
  },
})
