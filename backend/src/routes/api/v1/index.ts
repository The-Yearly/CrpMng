const dotenv = require("dotenv");
dotenv.config();
import {
  selectedPlot,
  fullFarmerDetails,
  CropGridType,
  IndivitualCrop,
  fullPlotDetails,
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
      cropStages: {
        select: {
          sid: true,
          stagename: true,
          duration: true,
          stagenumber: true,
          cropsubstages: {
            select: {
              substageid: true,
              substagename: true,
              cropsubstagesvalues: {
                select: {
                  substagedataid: true,
                  substagecoloumn: true,
                  substagecoloumnvalue: true,
                },
                orderBy: {
                  substagedataid: "asc",
                },
              },
            },
            orderBy: { substagenumber: "asc" },
          },
        },
        orderBy: {
          stagenumber: "asc",
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
      stages: resp.cropStages.map((stages) => ({
        sid: stages.sid,
        stagename: stages.stagename,
        stagenumber: stages.stagenumber,
        duration: stages.duration,
        cropsubstages: stages.cropsubstages.map((substages) => ({
          substageid: substages.substageid,
          substagename: substages.substagename,
          substagescoloumns: substages.cropsubstagesvalues.map((data) => ({
            substagedataid: data.substagedataid,
            substagecolomn: data.substagecoloumn,
            substagecoloumnvalue: data.substagecoloumnvalue,
          })),
        })),
      })),
    };
    res.json({ data: formattedResp });
  }
});

router.post("/addCrop", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.crop.create({
    data: {
      cropName: data.cropName,
      cropImage: data.cropImage,
      cropDesc: "",
    },
  });
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.delete("/deleteFarmer/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const resp = await client.farmer.delete({
    where: {
      farmerId: id,
    },
  });
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.delete("/deleteCrop/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const resp = await client.crop.delete({
    where: {
      cropId: id,
    },
  });
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.put("/editCrop", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.crop.update({
    where: {
      cropId: data.cropId,
    },
    data: {
      cropName: data.cropActivity.name,
      cropImage: data.cropActivity.image,
    },
  });
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.post("/newCropActivity", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropstages.create({
    data: {
      cropId: data.cropId,
      stagename: data.cropActivity.name,
      duration: parseInt(data.cropActivity.duration),
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.put("/editCropActivity", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropstages.update({
    where: {
      sid: data.cropActivity.id,
    },
    data: {
      stagename: data.cropActivity.name,
      duration: parseInt(data.cropActivity.duration),
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.delete("/deleteCropActivity/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const resp = await client.cropstages.delete({
    where: {
      sid: id,
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.post("/addSubActivity", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropsubstages.create({
    data: {
      stageid: data.sid,
      substagename: data.subactivity.name,
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.put("/editSubActivity", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropsubstages.update({
    where: {
      substageid: data.cropActivity.id,
    },
    data: {
      substagename: data.cropActivity.name,
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.delete("/deleteSubActivity/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const resp = await client.cropsubstages.delete({
    where: {
      substageid: id,
    },
  });

  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});
router.post("/addSubActivityColoumn", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropsubstagesvalue.create({
    data: {
      substageid: data.sid,
      substagecoloumn: data.subactivity.name,
      substagecoloumnvalue: data.subactivity.type,
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.put("/editSubActivityColoumn", async (req, res) => {
  const data = req.body;
  console.log(data);
  const resp = await client.cropsubstagesvalue.update({
    where: {
      substagedataid: data.subactivity.id,
    },
    data: {
      substagecoloumn: data.subactivity.name,
      substagecoloumnvalue: data.subactivity.type,
    },
  });
  console.log(resp);
  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.delete("/deleteSubActivityColoumn/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const resp = await client.cropsubstagesvalue.delete({
    where: {
      substagedataid: id,
    },
  });

  if (resp) {
    res.status(200).json({ message: "Success" });
  }
});

router.get("/getPlotDetails/:id", async (req, res) => {
  const id = req.params.id;
  const resp = await client.plot.findUnique({
    where: {
      plotId: parseInt(id),
    },
    select: {
      plotId: true,
      address: true,
      location: true,
      farmerId: true,
      fid: {
        select: {
          agentId: true,
        },
      },
      plotCords: true,
      plotImage: true,
      cropplottables: {
        select: {
          cid: {
            select: {
              cropName: true,
              cropStages: {
                select: {
                  stagename: true,
                  cropsubstages: {
                    select: {
                      substagename: true,
                      cropsubstagesvalues: {
                        select: {
                          plotsubstagevalues: {
                            select: {
                              name: true,
                              data: true,
                              substagevalue: true,
                            },
                          },
                        },
                      },
                    },
                    orderBy: {
                      substagenumber: "asc",
                    },
                  },
                },
                orderBy: { stagenumber: "asc" },
              },
            },
          },
        },
      },
    },
  });
  if (resp) {
    const formattedResp: fullPlotDetails = {
      agentId: resp.fid.agentId,
      plotId: resp.plotId,
      farmerId: resp.farmerId,
      crop: resp.cropplottables[0]?.cid?.cropName ?? "",
      location: resp.location,
      plot: (resp.plotCords ?? []) as LatLngTuple[],
      plotImage: resp.plotImage,

      cropData: resp.cropplottables.map((cp) => ({
        cropStages: cp.cid.cropStages,
      })),
    };

    res.json({ data: formattedResp });
  }
});


router.post("/addFarmer",async(req,res)=>{
  const data=req.body
  console.log(data)
  const resp=await client.farmer.create({
    data:{
      farmerName:data.farmerName,
      farmerFather:data.farmerFather,
      aadharNumber:data.aadharNumber,
      address:data.address,
      country:data.country,
      district:data.district,
      farmCode:parseInt(data.farmCode),
      farmerAge:parseInt(data.farmerAge),
      farmerPic:data.farmerImage,
      gender:data.gender,
      landHoldingType:data.landHoldingType,
      migrantStatus:data.migrantStatus,
      phone:data.phone,
      season:data.season,
      tehsil:data.tehsil,
      village:data.village,
      agentId:1
    }
  })
  if(resp){
     res.status(200).json({ message: "Success" });
  }
})