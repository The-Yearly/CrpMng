/*
  Warnings:

  - Added the required column `cropDesc` to the `crop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crop" ADD COLUMN     "cropDesc" TEXT NOT NULL;
