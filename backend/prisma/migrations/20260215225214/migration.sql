-- DropForeignKey
ALTER TABLE "cropplottable" DROP CONSTRAINT "cropplottable_cropId_fkey";

-- DropForeignKey
ALTER TABLE "cropplottable" DROP CONSTRAINT "cropplottable_plotId_fkey";

-- DropForeignKey
ALTER TABLE "cropstages" DROP CONSTRAINT "cropstages_cropId_fkey";

-- DropForeignKey
ALTER TABLE "cropsubstages" DROP CONSTRAINT "cropsubstages_stageid_fkey";

-- DropForeignKey
ALTER TABLE "cropsubstagesvalue" DROP CONSTRAINT "cropsubstagesvalue_substageid_fkey";

-- DropForeignKey
ALTER TABLE "farmercropstable" DROP CONSTRAINT "farmercropstable_cropId_fkey";

-- DropForeignKey
ALTER TABLE "farmercropstable" DROP CONSTRAINT "farmercropstable_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "plot" DROP CONSTRAINT "plot_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "plotsubstagevalue" DROP CONSTRAINT "plotsubstagevalue_plotId_fkey";

-- DropForeignKey
ALTER TABLE "plotsubstagevalue" DROP CONSTRAINT "plotsubstagevalue_substagdataeid_fkey";

-- AddForeignKey
ALTER TABLE "plot" ADD CONSTRAINT "plot_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("farmerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmercropstable" ADD CONSTRAINT "farmercropstable_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("farmerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmercropstable" ADD CONSTRAINT "farmercropstable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropplottable" ADD CONSTRAINT "cropplottable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropplottable" ADD CONSTRAINT "cropplottable_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plot"("plotId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropstages" ADD CONSTRAINT "cropstages_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropsubstages" ADD CONSTRAINT "cropsubstages_stageid_fkey" FOREIGN KEY ("stageid") REFERENCES "cropstages"("sid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cropsubstagesvalue" ADD CONSTRAINT "cropsubstagesvalue_substageid_fkey" FOREIGN KEY ("substageid") REFERENCES "cropsubstages"("substageid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plotsubstagevalue" ADD CONSTRAINT "plotsubstagevalue_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "plot"("plotId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plotsubstagevalue" ADD CONSTRAINT "plotsubstagevalue_substagdataeid_fkey" FOREIGN KEY ("substagdataeid") REFERENCES "cropsubstagesvalue"("substagedataid") ON DELETE CASCADE ON UPDATE CASCADE;
