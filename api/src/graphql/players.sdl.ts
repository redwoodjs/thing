export const schema = gql`
  type Player {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    gravatarHash: String
    plays: [Play]!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: String!): Player @requireAuth
  }

  input CreatePlayerInput {
    name: String!
    gravatarHash: String
  }

  input UpdatePlayerInput {
    name: String
    gravatarHash: String
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: String!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: String!): Player! @requireAuth
  }
`
