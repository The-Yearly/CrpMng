-- AddForeignKey
ALTER TABLE "farmer" ADD CONSTRAINT "farmer_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plot" ADD CONSTRAINT "plot_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("farmerId") ON DELETE RESTRICT ON UPDATE CASCADE;
