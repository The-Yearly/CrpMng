const dotenv = require("dotenv");
dotenv.config();
import {
  selectedPlot,
  fullFarmerDetails,
  CropGridType,
  IndivitualCrop,
} from "../../../../utils/types";
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
      address: true,
      location: true,
      plotCords: true,
      plotImage: true,
      cropplottables: { select: { cid: { select: { cropName: true } } } },
      fid: {
        select: {
          farmerName: true,
          farmerPic: true,
          agentId: true,
        },
      },
    },
  });
  console.log(response);
  if (response) {
    const formattedResp: selectedPlot[] = response.map((crop) => ({
      agentId: crop.fid.agentId,
      crop: crop.cropplottables[0]?.cid.cropName || "unassigned",
      farmerId: crop.farmerId,
      farmerImage: crop.fid.farmerPic,
      name: crop.fid.farmerName,
      location: crop.location,
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
      farmercropstables: { select: { cid: { select: { cropName: true } } } },
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
      crops:
        farmer.farmercropstables?.map((crop) => crop.cid.cropName) ||
        "unassigned",
    }));
    res.json({ data: formattedResp });
  }
});

router.get("/getCrops", async (req, res) => {
  const resp = await client.crop.findMany({
    select: {
      cropId: true,
      cropName: true,
      cropImage: true,
      _count: {
        select: {
          farmercropstables: true,
          cropplottables: true,
        },
      },
    },
  });
  if (resp) {
    const formattedResp: CropGridType[] = resp.map((crop) => ({
      cropId: crop.cropId,
      cropImage: crop.cropImage,
      cropName: crop.cropName,
      stats: {
        totalFarmers: crop._count.farmercropstables,
        totalPlots: crop._count.cropplottables,
      },
    }));
    res.json({ data: formattedResp });
  }
});

router.get("/getCrops/:id", async (req, res) => {
  const id = req.params.id;
  const resp = await client.crop.findUnique({
    where: {
      cropId: parseInt(id),
    },
    select: {
      cropId: true,
      cropName: true,
      cropDesc: true,
      cropImage: true,
      _count: {
        select: { farmercropstables: true, cropplottables: true },
      },
      cropplottables: {
        select: {
          pid: {
            select: {
              location: true,
              plotCords: true,
              plotImage: true,
              plotId: true,
              fid: {
                select: {
                  farmerId: true,
                  agentId: true,
                  farmerName: true,
                  farmerPic: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (resp) {
    const formattedResp: IndivitualCrop = {
      cropName: resp.cropName,
      cropId: resp.cropId,
      cropDesc: resp.cropDesc,
      cropImage: resp.cropImage,
      stats: {
        totalFarmers: resp._count.farmercropstables,
        totalPlots: resp._count.cropplottables,
      },
      plots: resp.cropplottables.map((plot) => ({
        pid: {
          plotImage: plot.pid.plotImage,
          location: plot.pid.location,
          plotCords: plot.pid.plotCords as LatLngTuple[],
          plotId: plot.pid.plotId,
          fid: {
            agentId: plot.pid.fid.agentId,
            farmerId: plot.pid.fid.farmerId,
            farmerName: plot.pid.fid.farmerName,
            farmerPic: plot.pid.fid.farmerPic,
          },
        },
      })),
    };
    res.json({ data: formattedResp });
  }
});
