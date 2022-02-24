export const schema = gql`
  type Leader {
    playerId: String!
    player: Player!
    correctTotal: Int!
    incorrectTotal: Int!
    unansweredTotal: Int!
    place: Int!
  }

  type Query {
    leaders: [Leader!]! @skipAuth
  }
`
