-- CreateTable
CREATE TABLE "agent" (
    "agentId" SERIAL NOT NULL,
    "agentName" TEXT NOT NULL,
    "agentEmail" TEXT NOT NULL,
    "agentPass" TEXT NOT NULL,
    "agentPic" TEXT NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("agentId")
);

-- CreateTable
CREATE TABLE "farmer" (
    "farmerId" SERIAL NOT NULL,
    "farmerName" TEXT NOT NULL,
    "farmerFather" TEXT NOT NULL,
    "farmerPic" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "agentId" INTEGER NOT NULL,

    CONSTRAINT "farmer_pkey" PRIMARY KEY ("farmerId")
);

-- CreateTable
CREATE TABLE "plot" (
    "plotId" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "plotCords" JSONB NOT NULL,

    CONSTRAINT "plot_pkey" PRIMARY KEY ("plotId")
);

-- CreateIndex
CREATE UNIQUE INDEX "farmer_agentId_key" ON "farmer"("agentId");

-- AddForeignKey
ALTER TABLE "farmer" ADD CONSTRAINT "farmer_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;
