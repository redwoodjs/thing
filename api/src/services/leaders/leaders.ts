import { db } from 'src/lib/db'

// This is a test of Prisma counting
// However, I think a [CTE](https://www.postgresql.org/docs/9.1/queries-with.html) is needed
// so that we can count correct, wrong, and played
// and also join in and return player data so that it matches the SDL
// With this you get a collection like:
// [
//   {
//     _count: { correctness: 1 },
//     playerId: '6475e75d-9051-45a0-b853-a18d0851bed9',
//   },
// ]
// which isn't ideal, but that means have to use Postgres and not SQLite
export const leaders = () => {
  return db.play.groupBy({
    by: ['playerId'],
    _count: {
      correctness: true,
    },
    where: {
      correctness: true,
    },
    orderBy: {
      _count: {
        correctness: 'desc',
      },
    },
  })
}
