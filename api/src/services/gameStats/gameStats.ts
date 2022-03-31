import type { GameStats } from 'types/graphql'
import { db } from 'src/lib/db'

export const gameStats = async ({ playerId }) => {
  const stats = await db.$queryRaw<GameStats[]>`
    SELECT
  	"playerId",
    count(1) FILTER (WHERE correctness = TRUE) AS "correct",
    count(1) FILTER (WHERE correctness = FALSE) AS "incorrect",
    1 AS "streak"
  FROM
  	"Play" p
  WHERE
    p. "playerId" = ${playerId}
    AND
  	p. "createdAt" >= CURRENT_TIMESTAMP - interval '100 day'
  GROUP BY
  	p. "playerId"
  LIMIT 1`

  return stats[0]
}
