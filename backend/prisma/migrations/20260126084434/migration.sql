-- DropForeignKey
ALTER TABLE "farmer" DROP CONSTRAINT "farmer_agentId_fkey";

-- DropIndex
DROP INDEX "farmer_agentId_key";
