const dotenv = require("dotenv");
dotenv.config();
import { selectedPlot, fullFarmerDetails } from "../../../../utils/types";
console.log(process.cwd());
console.log(process.env.TEST);
import { Router } from "express";
export const router = Router();
import { PrismaClient } from "../../../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { LatLngTuple } from "leaflet";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
console.log(process.env.DATABASE_URL);
const client = new PrismaClient({ adapter });
router.get("/getMapDetails", async (req, res) => {
  console.log("Hi");
  const response = await client.plot.findMany({
    select: {
      plotId: true,
      farmerId: true,
      crop: true,
      address: true,
      location: true,
      plotCords: true,
      plotImage: true,
      fid: {
        select: {
          farmerName: true,
          farmerPic: true,
          agentId: true,
          phone: true,
          _count: { select: { plots: true } },
        },
      },
    },
  });
  if (response) {
    const formattedResp: selectedPlot[] = response.map((crop) => ({
      agentId: crop.fid.agentId,
      crop: crop.crop,
      farmerId: crop.farmerId,
      farmerImage: crop.fid.farmerPic,
      name: crop.fid.farmerName,
      location: crop.location,
      noOfPlots: crop.fid._count.plots,
      phone: crop.fid.phone,
      plot: crop.plotCords as LatLngTuple[],
      plotId: crop.plotId,
      plotImage: crop.plotImage,
    }));
    res.json({ data: formattedResp });
  }
});

router.get("/getFarmerDets", async (req, res) => {
  const resp = await client.farmer.findMany({
    select: {
      agentId: true,
      farmerName: true,
      farmerId: true,
      phone: true,
      farmerPic: true,
      _count: { select: { plots: true } },
      plots: true,
    },
  });
  if (resp) {
    const formattedResp: fullFarmerDetails[] = resp.map((farmer) => ({
      agentId: farmer.agentId,
      farmerId: farmer.farmerId,
      farmerImage: farmer.farmerPic,
      name: farmer.farmerName,
      noOfPlots: farmer._count.plots,
      phone: farmer.phone,
      locations: farmer.plots.map((plot) => plot.location),
      crops: farmer.plots.map((plot) => plot.crop),
    }));
    res.json({ data: formattedResp });
  }
});
