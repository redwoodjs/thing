-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playerId" TEXT NOT NULL,
    "correctMovieId" TEXT,
    "correctness" BOOLEAN,
    CONSTRAINT "Play_correctMovieId_fkey" FOREIGN KEY ("correctMovieId") REFERENCES "Movie" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Play_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Play" ("correctMovieId", "correctness", "createdAt", "id", "playerId", "updatedAt") SELECT "correctMovieId", "correctness", "createdAt", "id", "playerId", "updatedAt" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
CREATE UNIQUE INDEX "Play_correctMovieId_key" ON "Play"("correctMovieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
