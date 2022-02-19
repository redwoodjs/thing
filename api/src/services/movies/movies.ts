import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const movies = () => {
  return db.movie.findMany()
}

export const movie = ({ id }: Prisma.MovieWhereUniqueInput) => {
  return db.movie.findUnique({
    where: { id },
  })
}

interface CreateMovieArgs {
  input: Prisma.MovieCreateInput
}

export const createMovie = ({ input }: CreateMovieArgs) => {
  return db.movie.create({
    data: input,
  })
}

interface UpdateMovieArgs extends Prisma.MovieWhereUniqueInput {
  input: Prisma.MovieUpdateInput
}

export const updateMovie = ({ id, input }: UpdateMovieArgs) => {
  return db.movie.update({
    data: input,
    where: { id },
  })
}

export const deleteMovie = ({ id }: Prisma.MovieWhereUniqueInput) => {
  return db.movie.delete({
    where: { id },
  })
}

export const Movie = {
  plays: (_obj, { root }: ResolverArgs<ReturnType<typeof movie>>) =>
    db.movie.findUnique({ where: { id: root.id } }).plays(),
  possibleMovies: (_obj, { root }: ResolverArgs<ReturnType<typeof movie>>) =>
    db.movie.findUnique({ where: { id: root.id } }).possibleMovies(),
}
