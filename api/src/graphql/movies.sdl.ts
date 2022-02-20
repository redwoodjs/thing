export const schema = gql`
  type Movie {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tmdbId: Int!
    title: String!
    releasedOn: DateTime!
    posterPath: String!
    tagline: String
    possibleMovies: [PossibleMovie]!
    correctPlays: [Play]!
    answeredPlays: [Play]!
  }

  type Query {
    movies: [Movie!]! @skipAuth
    movie(id: String!): Movie @skipAuth
  }

  input CreateMovieInput {
    tmdbId: Int!
    title: String!
    releasedOn: DateTime!
    posterPath: String!
    tagline: String
  }

  input UpdateMovieInput {
    tmdbId: Int
    title: String
    releasedOn: DateTime
    posterPath: String
    tagline: String
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie! @requireAuth
    updateMovie(id: String!, input: UpdateMovieInput!): Movie! @requireAuth
    deleteMovie(id: String!): Movie! @requireAuth
  }
`
