import { db } from 'src/lib/db'

/**
 * Calculates the leaders for a leaderboard based on the number of plays,
 * the total correct, incorrect, and unanswered.
 *
 * Uses a CTE and a Postgres DENSE_RANK() window function to ranking each players place
 *
 * Dense ranking gives the player with teh same score, the same rank (ie, share place)
 *
 * The top player is the one with the most correct plays.
 *
 * I *really* wish Prisma supported views.
 *
 * @returns an array of <Leaderboard>
 * @see Postgres Window Functions https://www.postgresql.org/docs/current/functions-window.html
 */
export const leaderboards = async () => {
  // how can I import the Leaderboard type for the graphql types (not Prisma types)?
  const leaders = await db.$queryRaw<Leaderboard[]>`
  WITH correct_counts AS (
    SELECT
      p. "playerId",
      1 AS played,
      CASE WHEN correctness = TRUE THEN
        1
      END AS correct,
      CASE WHEN correctness = FALSE THEN
        1
      END AS incorrect,
      CASE WHEN correctness IS NULL THEN
        1
      END AS unanswered
    FROM
      "Play" p
  ),
  totals AS (
    SELECT
      "playerId",
      coalesce(sum(played),
        0) AS "playedTotal",
      coalesce(sum(correct),
        0) AS "correctTotal",
      coalesce(sum(incorrect),
        0) AS "incorrectTotal",
      coalesce(sum(unanswered),
        0) AS "unansweredTotal"
    FROM
      correct_counts
    GROUP BY
      "playerId"
  )
  SELECT
    t. "playerId",
    p.name,
    p. "gravatarHash",
    t. "playedTotal",
    t. "correctTotal",
    t. "incorrectTotal",
    t. "unansweredTotal",
    DENSE_RANK() OVER (PARTITION BY t. "playerId" ORDER BY t. "correctTotal" DESC) AS place,
		ROW_NUMBER() OVER () AS "leaderboardRowNumber"
    FROM
      totals t
      JOIN "Player" p ON p.id = t. "playerId"
    ORDER BY
      place DESC,
      p.name ASC`

  return leaders
}

/**
 * The leaderboard with scores for a given player
 *
 * @param playerId
 * @returns a Leaderboard record
 */
export const playerLeaderboard = async ({ playerId }) => {
  // how can I import the Leaderboard type for the graphql types (not Prisma types)?
  const leaders = await db.$queryRaw<Leaderboard[]>`
  WITH correct_counts AS (
    SELECT
      p. "playerId",
      1 AS played,
      CASE WHEN correctness = TRUE THEN
        1
      END AS correct,
      CASE WHEN correctness = FALSE THEN
        1
      END AS incorrect,
      CASE WHEN correctness IS NULL THEN
        1
      END AS unanswered
    FROM
      "Play" p
  ),
  totals AS (
    SELECT
      "playerId",
      coalesce(sum(played),
        0) AS "playedTotal",
      coalesce(sum(correct),
        0) AS "correctTotal",
      coalesce(sum(incorrect),
        0) AS "incorrectTotal",
      coalesce(sum(unanswered),
        0) AS "unansweredTotal"
    FROM
      correct_counts
    GROUP BY
      "playerId"
  )
  SELECT
    t. "playerId",
    p.name,
    p. "gravatarHash",
    t. "playedTotal",
    t. "correctTotal",
    t. "incorrectTotal",
    t. "unansweredTotal",
    DENSE_RANK() OVER (PARTITION BY t. "playerId" ORDER BY t. "correctTotal" DESC) AS place,
		ROW_NUMBER() OVER () AS "leaderboardRowNumber"
    FROM
      totals t
      JOIN "Player" p ON p.id = t. "playerId" AND p.id = ${playerId}
    ORDER BY
      place DESC,
      p.name ASC`

  return leaders[0]
}

/**
 * The leaderboard with scores for a given player and the surrounding +/- 2 players
 *
 * @param playerId
 * @returns an array Leaderboard records
 */
export const leaderboardWindow = async ({ playerId, window = 2 }) => {
  // how can I import the Leaderboard type for the graphql types (not Prisma types)?
  const leaders = await db.$queryRaw<Leaderboard[]>`
WITH correct_counts AS (
	SELECT
		p. "playerId",
		1 AS played,
		CASE WHEN correctness = TRUE THEN
			1
		END AS correct,
		CASE WHEN correctness = FALSE THEN
			1
		END AS incorrect,
		CASE WHEN correctness IS NULL THEN
			1
		END AS unanswered
	FROM
		"Play" p
),
totals AS (
	SELECT
		"playerId",
		coalesce(sum(played),
			0) AS "playedTotal",
		coalesce(sum(correct),
			0) AS "correctTotal",
		coalesce(sum(incorrect),
			0) AS "incorrectTotal",
		coalesce(sum(unanswered),
			0) AS "unansweredTotal"
	FROM
		correct_counts
	GROUP BY
		"playerId"
),
leaderboard AS (
	SELECT
		t. "playerId",
		p.name,
		p. "gravatarHash",
		t. "playedTotal",
		t. "correctTotal",
		t. "incorrectTotal",
		t. "unansweredTotal",
		DENSE_RANK() OVER (PARTITION BY t. "playerId" ORDER BY t. "correctTotal" DESC,
			p.name ASC) AS place,
		ROW_NUMBER() OVER () AS "leaderboardRowNumber"
	FROM
		totals t
		JOIN "Player" p ON p.id = t. "playerId" ORDER BY
			place DESC,
			p.name ASC
),
player_leaderboard AS (
SELECT
	*
FROM
	leaderboard l
WHERE
	l. "playerId" = ${playerId}
)

SELECT leaderboard.*
  FROM leaderboard, player_leaderboard
    WHERE ABS(leaderboard."leaderboardRowNumber" - player_leaderboard."leaderboardRowNumber") <= ${window}
  ORDER BY leaderboard."leaderboardRowNumber"`

  return leaders
}
