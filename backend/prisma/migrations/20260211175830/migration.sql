-- DropForeignKey
ALTER TABLE "crop" DROP CONSTRAINT "crop_farmerId_fkey";

-- CreateTable
CREATE TABLE "farmercropstable" (
    "cropId" INTEGER NOT NULL,
    "farmerId" INTEGER NOT NULL,

    CONSTRAINT "farmercropstable_pkey" PRIMARY KEY ("cropId","farmerId")
);

-- AddForeignKey
ALTER TABLE "farmercropstable" ADD CONSTRAINT "farmercropstable_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("farmerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmercropstable" ADD CONSTRAINT "farmercropstable_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE RESTRICT ON UPDATE CASCADE;
