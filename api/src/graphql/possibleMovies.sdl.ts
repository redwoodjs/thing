export const schema = gql`
  type PossibleMovie {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    play: Play!
    playId: String!
    movie: Movie!
    movieId: String!
  }

  type Query {
    possibleMovies: [PossibleMovie!]! @requireAuth
    possibleMovie(id: String!): PossibleMovie @requireAuth
  }

  input CreatePossibleMovieInput {
    playId: String!
    movieId: String!
  }

  input UpdatePossibleMovieInput {
    playId: String
    movieId: String
  }

  type Mutation {
    createPossibleMovie(input: CreatePossibleMovieInput!): PossibleMovie!
      @requireAuth
    updatePossibleMovie(
      id: String!
      input: UpdatePossibleMovieInput!
    ): PossibleMovie! @requireAuth
    deletePossibleMovie(id: String!): PossibleMovie! @requireAuth
  }
`
