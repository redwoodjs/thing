/*
  Warnings:

  - You are about to drop the column `tagline` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "tagline",
ADD COLUMN     "overview" TEXT;
