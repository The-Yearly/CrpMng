/*
  Warnings:

  - Added the required column `name` to the `plotsubstagevalue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plotsubstagevalue" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "data" SET DATA TYPE TEXT;
