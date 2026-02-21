-- CreateTable
CREATE TABLE "crop" (
    "cropId" SERIAL NOT NULL,
    "cropName" TEXT NOT NULL,
    "cropImage" TEXT NOT NULL,
    "farmerId" INTEGER NOT NULL,

    CONSTRAINT "crop_pkey" PRIMARY KEY ("cropId")
);

-- AddForeignKey
ALTER TABLE "crop" ADD CONSTRAINT "crop_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("farmerId") ON DELETE RESTRICT ON UPDATE CASCADE;
