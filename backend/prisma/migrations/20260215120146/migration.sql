/*
  Warnings:

  - You are about to drop the `cropStages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cropStages" DROP CONSTRAINT "cropStages_cropId_fkey";

-- DropTable
DROP TABLE "cropStages";

-- CreateTable
CREATE TABLE "cropstages" (
    "sid" SERIAL NOT NULL,
    "stagename" TEXT NOT NULL,
    "cropId" INTEGER NOT NULL,
    "stagenumber" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cropstages_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "cropsubstages" (
    "substageid" SERIAL NOT NULL,
    "stageid" INTEGER NOT NULL,
    "substagename" TEXT NOT NULL,
    "substagenumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cropsubstages_pkey" PRIMARY KEY ("substageid")
);

-- CreateTable
CREATE TABLE "cropsubstagesvalue" (
    "substagedataid" SERIAL NOT NULL,
    "substageid" INTEGER NOT NULL,
    "substagecoloumn" TEXT NOT NULL,
    "substagecoloumnvalue" TEXT NOT NULL,

    CONSTRAINT "cropsubstagesvalue_pkey" PRIMARY KEY ("substagedataid")
);

-- CreateTable
CREATE TABLE "plotsubstagevalue" (
    "plotId" INTEGER NOT NULL,
    "substagdataeid" INTEGER NOT NULL,
    "data" INTEGER NOT NULL,

    CONSTRAINT "plotsubstagevalue_pkey" PRIMARY KEY ("plotId","substagdataeid")
);

-- AddForeignKey
ALTER TABLE "cropstages" ADD CONSTRAINT "cropstages_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropsubstages" ADD CONSTRAINT "cropsubstages_stageid_fkey" FOREIGN KEY ("stageid") REFERENCES "cropstages"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropsubstagesvalue" ADD CONSTRAINT "cropsubstagesvalue_substageid_fkey" FOREIGN KEY ("substageid") REFERENCES "cropsubstages"("substageid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plotsubstagevalue" ADD CONSTRAINT "plotsubstagevalue_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plot"("plotId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plotsubstagevalue" ADD CONSTRAINT "plotsubstagevalue_substagdataeid_fkey" FOREIGN KEY ("substagdataeid") REFERENCES "cropsubstagesvalue"("substagedataid") ON DELETE RESTRICT ON UPDATE CASCADE;
