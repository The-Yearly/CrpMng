"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { IndivitualCrop, selectedPlot } from "../../utils/types";
import { LatLngTuple } from "leaflet";
import { CropSideBar } from "./components/CropSideBar";
import { CropMainData } from "./components/cropMainData";
export default function CropPage() {
  const [crop, setCrop] = useState<IndivitualCrop | null>(null);
  const [plots, SetPlots] = useState<selectedPlot[]>([]);
  const [refresh, setRefresh] = useState(false);
  const params = useParams();
  const refreshData = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getCrops/" + params.id,
      );
      setCrop(res.data.data);
      console.log(res.data.data);
    };
    fetchData();
  }, [refresh]);
  useEffect(() => {
    const formatPlots = () => {
      if (crop && crop.plots) {
        const formattedPlots: selectedPlot[] = crop.plots.map((plot) => ({
          agentId: plot.pid.fid.agentId,
          crop: crop.cropName,
          farmerName: plot.pid.fid.farmerName,
          farmerId: plot.pid.fid.farmerId,
          farmerPic: plot.pid.fid.farmerPic,
          location: plot.pid.location,
          noOfPlots: crop.stats.totalPlots,
          plot: plot.pid.plotCords as LatLngTuple[],
          plotId: plot.pid.plotId,
          plotImage: plot.pid.plotImage,
        }));
        SetPlots(formattedPlots);
      }
    };
    formatPlots();
  }, [crop]);
  console.log(crop);
  if (crop) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3">
        <CropSideBar crop={crop} plots={plots} />
        <CropMainData refreshData={refreshData} crop={crop} />
      </div>
    );
  }
}
