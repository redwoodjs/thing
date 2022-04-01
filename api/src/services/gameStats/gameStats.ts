import type { GameStats } from 'types/graphql'
import { db } from 'src/lib/db'

export const gameStats = async ({ playerId }) => {
  const stats = await db.$queryRaw<GameStats[]>`
  WITH streaks AS (
    WITH my_view AS (
      SELECT
        p. "playerId",
        p. "createdAt",
        CASE WHEN p.correctness = TRUE THEN
          1
        ELSE
          - 1
        END AS win
      FROM
        "Play" p
      WHERE
        p. "createdAt" >= CURRENT_TIMESTAMP - interval '1 day'
      ORDER BY
        p. "createdAt"
    )

    SELECT DISTINCT ON ("playerId")
      "playerId",
      max("createdAt") AS "createdAt",
      count(*) AS streak
    FROM (
      SELECT
        "playerId",
        "createdAt",
        win,
        sum(grp) OVER w AS grp
        FROM (
        SELECT
          "playerId",
          "createdAt",
          win,
          (win < 0
          AND lag(win,
          1,
          1) OVER w > 0)::int AS grp
        FROM
          my_view WINDOW w AS (PARTITION BY "playerId" ORDER BY
            "createdAt")) s WINDOW w AS (PARTITION BY "playerId" ORDER BY
          "createdAt")) s
    WHERE
      win > 0
    GROUP BY
      "playerId",
      grp ORDER BY
        "playerId" DESC,
        streak DESC
  )

  SELECT
    p. "playerId",
    count(1) FILTER (WHERE correctness = TRUE) AS "correct",
    count(1) FILTER (WHERE correctness = FALSE) AS "incorrect",
    coalesce(max(s.streak), 0) AS "streak"
  FROM
    "Play" p
    LEFT JOIN streaks s ON s. "playerId" = p. "playerId"
  WHERE
    p. "playerId" = ${playerId}
    AND p. "createdAt" >= CURRENT_TIMESTAMP - interval '1 day'
  GROUP BY
    p. "playerId"
  LIMIT 1   `

  return stats[0] || { correct: 0, incorrect: 0, streak: 0 }
}

// export const maximumPlayerWinStreaks = async ({ playerId }) => {
//   const streaks = await db.$queryRaw`WITH my_view AS (
//     SELECT
//       p. "playerId",
//       p."createdAt",
//       CASE WHEN p.correctness = TRUE THEN
//         1
//       ELSE
//         - 1
//       END AS win
//     FROM
//       "Play" p
//     ORDER BY
//       p. "createdAt"
//   ) SELECT DISTINCT ON ("playerId")
//     "playerId",
//     max("createdAt") AS "createdAt",
//     count(*) AS streak
//   FROM (
//     SELECT
//       "playerId",
//       "createdAt",
//       win,
//       sum(grp) OVER w AS grp
//       FROM (
//       SELECT
//         "playerId",
//         "createdAt",
//         win,
//         (win < 0
//         AND lag(win, 1, 1) OVER w > 0)::int AS grp
//       FROM
//         my_view WINDOW w AS (PARTITION BY "playerId" ORDER BY
//           "createdAt")) s WINDOW w AS (PARTITION BY "playerId" ORDER BY
//         "createdAt")) s
//     WHERE
//         p. "playerId" = ${playerId}
//         AND
//         win > 0
//   GROUP BY
//     "playerId",
//     grp
//   ORDER BY
//     "playerId" DESC,
//     streak DESC`

//   return streaks[0]
// }
