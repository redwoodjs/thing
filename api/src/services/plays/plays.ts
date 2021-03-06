import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const plays = () => {
  return db.play.findMany()
}

export const play = ({ id }: Prisma.PlayWhereUniqueInput) => {
  return db.play.findUnique({
    where: { id },
  })
}

interface CreatePlayArgs {
  input: Prisma.PlayCreateInput
}

export const createPlay = ({ input }: CreatePlayArgs) => {
  return db.play.create({
    data: input,
    include: { answeredMovie: true, correctMovie: true, possibleMovies: true },
  })
}

interface UpdatePlayArgs extends Prisma.PlayWhereUniqueInput {
  input: Prisma.PlayUpdateInput
}

export const updatePlay = ({ id, input }: UpdatePlayArgs) => {
  return db.play.update({
    data: input,
    where: { id },
    include: { answeredMovie: true, correctMovie: true, possibleMovies: true },
  })
}

export const deletePlay = ({ id }: Prisma.PlayWhereUniqueInput) => {
  return db.play.delete({
    where: { id },
  })
}

export const unansweredPlays = () => {
  return db.play.findMany({ where: { answeredMovie: null } })
}

export const Play = {
  player: (_obj, { root }: ResolverArgs<ReturnType<typeof play>>) =>
    db.play.findUnique({ where: { id: root.id } }).player(),
  correctMovie: (_obj, { root }: ResolverArgs<ReturnType<typeof play>>) =>
    db.play.findUnique({ where: { id: root.id } }).correctMovie(),
  possibleMovies: (_obj, { root }: ResolverArgs<ReturnType<typeof play>>) =>
    db.play.findUnique({ where: { id: root.id } }).possibleMovies(),
  answeredMovie: (_obj, { root }: ResolverArgs<ReturnType<typeof play>>) =>
    db.play.findUnique({ where: { id: root.id } }).answeredMovie(),
}
