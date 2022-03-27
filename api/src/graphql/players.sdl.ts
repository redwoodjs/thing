export const schema = gql`
  type Player {
    id: String!
    clerkId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    gravatarHash: String
    plays: [Play]!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: String, clerkId: String): Player @skipAuth
    playerByClerkId(clerkId: String!): Player @skipAuth
  }

  input CreatePlayerInput {
    name: String!
    gravatarHash: String
  }

  input UpdatePlayerInput {
    name: String
    clerkId: String
    gravatarHash: String
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: String!, input: UpdatePlayerInput!): Player! @skipAuth
    setGravatarHash(clerkId: String!, gravatarHash: String!): Player! @skipAuth
    deletePlayer(id: String!): Player! @requireAuth
  }
`
