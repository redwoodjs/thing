-- DropForeignKey
ALTER TABLE "Play" DROP CONSTRAINT "Play_answeredMovieId_fkey";

-- AlterTable
ALTER TABLE "Play" ALTER COLUMN "answeredMovieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_answeredMovieId_fkey" FOREIGN KEY ("answeredMovieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
