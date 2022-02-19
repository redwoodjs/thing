import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const players = () => {
  return db.player.findMany()
}

export const player = ({ id }: Prisma.PlayerWhereUniqueInput) => {
  return db.player.findUnique({
    where: { id },
  })
}

interface CreatePlayerArgs {
  input: Prisma.PlayerCreateInput
}

export const createPlayer = ({ input }: CreatePlayerArgs) => {
  return db.player.create({
    data: input,
  })
}

interface UpdatePlayerArgs extends Prisma.PlayerWhereUniqueInput {
  input: Prisma.PlayerUpdateInput
}

export const updatePlayer = ({ id, input }: UpdatePlayerArgs) => {
  return db.player.update({
    data: input,
    where: { id },
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
