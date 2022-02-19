/*
  Warnings:

  - Added the required column `answeredMovieId` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Made the column `correctMovieId` on table `Play` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playerId" TEXT NOT NULL,
    "correctMovieId" TEXT NOT NULL,
    "answeredMovieId" TEXT NOT NULL,
    "correctness" BOOLEAN,
    CONSTRAINT "Play_correctMovieId_fkey" FOREIGN KEY ("correctMovieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Play_answeredMovieId_fkey" FOREIGN KEY ("answeredMovieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Play_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Play" ("correctMovieId", "correctness", "createdAt", "id", "playerId", "updatedAt") SELECT "correctMovieId", "correctness", "createdAt", "id", "playerId", "updatedAt" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
CREATE UNIQUE INDEX "Play_correctMovieId_key" ON "Play"("correctMovieId");
CREATE UNIQUE INDEX "Play_answeredMovieId_key" ON "Play"("answeredMovieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
