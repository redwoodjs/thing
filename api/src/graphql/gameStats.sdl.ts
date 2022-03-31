export const schema = gql`
  type GameStats {
    playerId: String!
    correct: Int!
    incorrect: Int!
    streak: Int!
  }

  type Query {
    gameStats(playerId: String): GameStats! @skipAuth
  }
`
