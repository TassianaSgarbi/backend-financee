/*
  Warnings:

  - You are about to drop the column `date` on the `expanses` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `expanses` table. All the data in the column will be lost.
  - Added the required column `due_date` to the `expanses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expanses" DROP COLUMN "date",
DROP COLUMN "type",
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3),
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "ExpanseType";
