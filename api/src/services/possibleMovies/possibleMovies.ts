import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const possibleMovies = () => {
  return db.possibleMovie.findMany()
}

export const possibleMovie = ({ id }: Prisma.PossibleMovieWhereUniqueInput) => {
  return db.possibleMovie.findUnique({
    where: { id },
  })
}

interface CreatePossibleMovieArgs {
  input: Prisma.PossibleMovieCreateInput
}

export const createPossibleMovie = ({ input }: CreatePossibleMovieArgs) => {
  return db.possibleMovie.create({
    data: input,
  })
}

interface UpdatePossibleMovieArgs extends Prisma.PossibleMovieWhereUniqueInput {
  input: Prisma.PossibleMovieUpdateInput
}

export const updatePossibleMovie = ({ id, input }: UpdatePossibleMovieArgs) => {
  return db.possibleMovie.update({
    data: input,
    where: { id },
  })
}

export const deletePossibleMovie = ({
  id,
}: Prisma.PossibleMovieWhereUniqueInput) => {
  return db.possibleMovie.delete({
    where: { id },
  })
}

export const PossibleMovie = {
  play: (_obj, { root }: ResolverArgs<ReturnType<typeof possibleMovie>>) =>
    db.possibleMovie.findUnique({ where: { id: root.id } }).play(),
  movie: (_obj, { root }: ResolverArgs<ReturnType<typeof possibleMovie>>) =>
    db.possibleMovie.findUnique({ where: { id: root.id } }).movie(),
}
