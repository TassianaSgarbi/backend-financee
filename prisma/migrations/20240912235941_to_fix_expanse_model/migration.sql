/*
  Warnings:

  - You are about to drop the column `name` on the `expanses` table. All the data in the column will be lost.
  - Added the required column `description` to the `expanses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expanses" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "observation" TEXT;
