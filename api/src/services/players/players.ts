import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const players = () => {
  return db.player.findMany()
}

export const player = ({ id, clerkId }: Prisma.PlayerWhereUniqueInput) => {
  return db.player.findUnique({
    where: { id, clerkId },
  })
}

interface CreatePlayerArgs {
  input: Prisma.PlayerCreateInput
}

export const createPlayer = ({ input }: CreatePlayerArgs) => {
  // If the user is already logged in when creating the player we will
  // associate the user id with the player here. Otherwise that will happen
  // when the user signs up/logs in
  return db.player.create({
    data: { ...input, clerkId: context.currentUser?.id },
  })
}

interface UpdatePlayerArgs extends Prisma.PlayerWhereUniqueInput {
  input: Prisma.PlayerUpdateInput
}

export const updatePlayer = ({ id, input }: UpdatePlayerArgs) => {
  return db.player.update({
    where: { id },
    data: input,
  })
}

interface SetGravatarHashArgs {
  clerkId: string
  gravatarHash: string
}

export const setGravatarHash = ({
  clerkId,
  gravatarHash,
}: SetGravatarHashArgs) => {
  return db.player.update({
    where: { clerkId },
    data: { gravatarHash },
  })
}

export const deletePlayer = ({ id }: Prisma.PlayerWhereUniqueInput) => {
  return db.player.delete({
    where: { id },
  })
}

export const Player = {
  plays: (_obj, { root }: ResolverArgs<ReturnType<typeof player>>) =>
    db.player.findUnique({ where: { id: root.id } }).plays(),
}
