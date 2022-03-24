/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Player_clerkId_key" ON "Player"("clerkId");
