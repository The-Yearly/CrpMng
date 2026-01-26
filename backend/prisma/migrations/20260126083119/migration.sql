/*
  Warnings:

  - Added the required column `crop` to the `plot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plot" ADD COLUMN     "crop" TEXT NOT NULL;
