/*
  Warnings:

  - Added the required column `posterUrl` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "releasedOn" DATETIME NOT NULL,
    "posterUrl" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("createdAt", "id", "releasedOn", "title", "tmdbId", "updatedAt") SELECT "createdAt", "id", "releasedOn", "title", "tmdbId", "updatedAt" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
