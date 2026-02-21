-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "MigrantStatus" AS ENUM ('Migrant', 'Local');

-- CreateEnum
CREATE TYPE "LandHoldingType" AS ENUM ('Own', 'Lease');

-- AlterTable
ALTER TABLE "farmer" ADD COLUMN     "aadharNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "district" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "farmCode" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "farmerAge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "farmerAssociation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'Male',
ADD COLUMN     "landHoldingType" "LandHoldingType" NOT NULL DEFAULT 'Own',
ADD COLUMN     "migrantStatus" "MigrantStatus" NOT NULL DEFAULT 'Local',
ADD COLUMN     "season" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tehsil" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "village" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "farmerName" SET DEFAULT '',
ALTER COLUMN "farmerFather" SET DEFAULT '',
ALTER COLUMN "farmerPic" SET DEFAULT '',
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "phone" SET DEFAULT '';
