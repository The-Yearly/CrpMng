/*
  Warnings:

  - Added the required column `address` to the `plot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `plot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plotImage` to the `plot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plot" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "plotImage" TEXT NOT NULL;
