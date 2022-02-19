/*
  Warnings:

  - Added the required column `correctness` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Play` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "releasedOn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "gravatarHash" TEXT
);

-- CreateTable
CREATE TABLE "PossibleMovie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "PossibleMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PossibleMovie_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playerId" TEXT NOT NULL,
    "correctMovieId" TEXT,
    "correctness" BOOLEAN NOT NULL,
    CONSTRAINT "Play_correctMovieId_fkey" FOREIGN KEY ("correctMovieId") REFERENCES "Movie" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Play_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Play" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
CREATE UNIQUE INDEX "Play_correctMovieId_key" ON "Play"("correctMovieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
