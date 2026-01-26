import { router } from "./routes/api/v1/index";
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
console.log(process.env.TEST,"Crop Manager Backend")
const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);
app.listen(process.env.PORT || port);
app.get("/test", (req: Request, res: Response) => {
  console.log(process.env.TEST)
  res.json({ HI: process.env.TEST });
});
