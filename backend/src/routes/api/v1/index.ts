const dotenv = require('dotenv')
dotenv.config()
console.log(process.cwd())
console.log(process.env.TEST)
import { Router } from "express";
export const router = Router();
import { PrismaClient } from "../../../generated/prisma";
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
console.log(process.env.DATABASE_URL )
const client = new PrismaClient({adapter});
router.get("/getMapDetails", async (req, res) => {
  console.log("Hi")
  const response = await client.plot.findMany({
    select:{
      plotId:true,
      farmerId:true,
      crop:true,
      address:true,
      location:true,
      plotCords:true,
      plotImage:true,
      fid:{
        select:{
          farmerName:true,
          farmerPic:true,
          phone:true,
        }
      }
    }
  })
  res.json({data:response})
});
