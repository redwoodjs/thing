export const schema = gql`
  type Leaderboard {
    playerId: String!
    player: Player!
    correctTotal: Int!
    incorrectTotal: Int!
    unansweredTotal: Int!
    playedTotal: Int!
    place: Int!
    leaderboardRowNumber: Int!
  }

  type Query {
    leaderboards: [Leaderboard!]! @skipAuth
    playerLeaderboard(playerId: String!): Leaderboard @skipAuth
    leaderboardWindow(playerId: String!, window: Int): [Leaderboard] @skipAuth
  }
`
