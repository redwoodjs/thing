-- CreateIndex
CREATE INDEX "Movie_id_idx" ON "Movie"("id");

-- CreateIndex
CREATE INDEX "Movie_tmdbId_idx" ON "Movie"("tmdbId");

-- CreateIndex
CREATE INDEX "Play_id_idx" ON "Play"("id");

-- CreateIndex
CREATE INDEX "Play_playerId_idx" ON "Play"("playerId");

-- CreateIndex
CREATE INDEX "Play_correctMovieId_idx" ON "Play"("correctMovieId");

-- CreateIndex
CREATE INDEX "Play_answeredMovieId_idx" ON "Play"("answeredMovieId");

-- CreateIndex
CREATE INDEX "Play_correctness_idx" ON "Play"("correctness");

-- CreateIndex
CREATE INDEX "Player_id_idx" ON "Player"("id");

-- CreateIndex
CREATE INDEX "Player_name_idx" ON "Player"("name");

-- CreateIndex
CREATE INDEX "PossibleMovie_id_idx" ON "PossibleMovie"("id");

-- CreateIndex
CREATE INDEX "PossibleMovie_playId_idx" ON "PossibleMovie"("playId");

-- CreateIndex
CREATE INDEX "PossibleMovie_movieId_idx" ON "PossibleMovie"("movieId");

-- CreateIndex
CREATE INDEX "PossibleMovie_playId_movieId_idx" ON "PossibleMovie"("playId", "movieId");
