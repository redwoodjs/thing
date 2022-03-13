export const schema = gql`
  type GameMovieDetail {
    id: String!
    title: String!
    overview: String
    photoPath: String!
  }

  type Game {
    playId: String!
    playerId: String!
    year: Int!
    choices: [GameMovieDetail]!
  }

  type Query {
    randomMovie: Movie! @skipAuth
    createGame(playerId: String): Game! @skipAuth
  }
  input AnswerGameInput {
    playId: String!
    playerId: String!
    answeredMovieId: String
  }
  type Mutation {
    # will be @requireAuth
    answerGame(input: AnswerGameInput!): Play! @skipAuth
  }
`
