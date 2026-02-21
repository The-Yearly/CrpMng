-- CreateTable
CREATE TABLE "cropStages" (
    "sid" SERIAL NOT NULL,
    "stageName" TEXT NOT NULL,
    "cropId" INTEGER NOT NULL,
    "stageNumber" INTEGER NOT NULL,

    CONSTRAINT "cropStages_pkey" PRIMARY KEY ("sid")
);

-- AddForeignKey
ALTER TABLE "cropStages" ADD CONSTRAINT "cropStages_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crop"("cropId") ON DELETE RESTRICT ON UPDATE CASCADE;
