export const schema = gql`
  type Leader {
    playerId: String!
    player: Player!
    playedCount: Int!
    # correctCount: Int!
    # incorrectCount: Int!
  }

  type Query {
    leaders: [Leader!]! @skipAuth
  }
`
