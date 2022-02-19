export const schema = gql`
  type Play {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    playerId: String!
    player: Player!
    correctMovie: Movie!
    correctMovieId: String!
    possibleMovies: [PossibleMovie]!
    answeredMovie: Movie!
    answeredMovieId: String!
    correctness: Boolean
  }

  type Query {
    plays: [Play!]! @requireAuth
    play(id: String!): Play @requireAuth
  }

  input CreatePlayInput {
    answeredMovieId: String!
  }

  input UpdatePlayInput {
    answeredMovieId: String
  }

  type Mutation {
    createPlay(input: CreatePlayInput!): Play! @requireAuth
    updatePlay(id: String!, input: UpdatePlayInput!): Play! @requireAuth
    deletePlay(id: String!): Play! @requireAuth
  }
`
