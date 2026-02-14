/*
  Warnings:

  - You are about to drop the column `crop` on the `plot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plot" DROP COLUMN "crop";

-- CreateTable
CREATE TABLE "cropplottable" (
    "cropId" INTEGER NOT NULL,
    "plotId" INTEGER NOT NULL,

    CONSTRAINT "cropplottable_pkey" PRIMARY KEY ("cropId","plotId")
);

-- AddForeignKey
ALTER TABLE "cropplottable" ADD CONSTRAINT "cropplottable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropplottable" ADD CONSTRAINT "cropplottable_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plot"("plotId") ON DELETE RESTRICT ON UPDATE CASCADE;
