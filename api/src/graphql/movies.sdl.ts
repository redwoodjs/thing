export const schema = gql`
  type Movie {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    releasedOn: DateTime!
    possibleMovies: [PossibleMovie]!
    correctPlays: [Play]!
    answeredPlays: [Play]!
  }

  type Query {
    movies: [Movie!]! @requireAuth
    movie(id: String!): Movie @requireAuth
  }

  input CreateMovieInput {
    name: String!
    releasedOn: DateTime!
  }

  input UpdateMovieInput {
    name: String
    releasedOn: DateTime
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie! @requireAuth
    updateMovie(id: String!, input: UpdateMovieInput!): Movie! @requireAuth
    deleteMovie(id: String!): Movie! @requireAuth
  }
`
