"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { IndivitualCrop, selectedPlot } from "../../utils/types";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";
import { Pencil, PlusCircle } from "lucide-react";
const MapCard = dynamic(
  () =>
    import("../../components/CardVarients/MapCard").then(
      (mod) => mod.MapCardClient,
    ),
  {
    ssr: false,
  },
);
export default function CropPage() {
  const [crop, setCrop] = useState<IndivitualCrop | null>(null);
  const [plots, SetPlots] = useState<selectedPlot[]>([]);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getCrops/" + params.id,
      );
      setCrop(res.data.data);
      console.log(res.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const formatPlots = () => {
      if (crop) {
        const formattedPlots: selectedPlot[] = crop.plots.map((plot) => ({
          agentId: plot.pid.fid.agentId,
          crop: crop.cropName,
          name: plot.pid.fid.farmerName,
          farmerId: plot.pid.fid.farmerId,
          farmerImage: plot.pid.fid.farmerPic,
          location: plot.pid.location,
          noOfPlots: crop.stats.totalPlots,
          plot: plot.pid.plotCords as LatLngTuple[],
          plotId: plot.pid.plotId,
          plotImage: plot.pid.plotImage,
        }));
        SetPlots(formattedPlots);
      }
      console.log(plots);
    };
    formatPlots();
  }, [crop]);
  if (crop) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg col-span-1 flex h-screen flex-col w-full">
          <div className="relative w-full h-72 ">
            <Image
              src={crop.cropImage}
              alt="Crop Image"
              width={1000}
              height={1000}
              className="w-full h-full object-cover z-0"
            />
            <div className="absolute top-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 to w-full h-full" />
            <div className="absolute bottom-5 left-5 text-white font-serif text-5xl">
              {crop.cropName}
            </div>
          </div>
          <div className="flex">
            <div className="flex w-1/2 py-5 border-gray-300/80 border-1 flex-col items-center justify-center">
              <p className="text-xl text-gray-700/70">DAYS TO HARVEST</p>
              <p className="mt-2 text-4xl font-serif text-black">10</p>
            </div>
            <div className="flex w-1/2 py-5 border-gray-300/80 border-1 flex-col items-center justify-center">
              <p className="text-xl text-gray-700/70">PROJECTED YEILD</p>
              <p className="mt-2 text-4xl font-serif text-black">10</p>
            </div>
          </div>

          <div className="flex-grow px-8 py-8">
            {plots.length != 0 && (
              <MapCard showFilter={false} Plots={plots} key={1} />
            )}
          </div>
        </div>
        <div className="flex col-span-2 flex-col mt-8 items-center">
          <div className="flex w-full justify-between">
            <div className="flex ml-18  space-y-1 flex-col">
              <p className="text-5xl text-gray-800">Crop Insights</p>
              <p className="text-2xl ml-1 text-gray-800/40">
                Detailed health metrics and operational history
              </p>
            </div>
            <div className="flex gap-4 mr-12">
              <button className="bg-white/80 border-gray-900/20 text-gray-700 border-1 flex items-center gap-2 rounded-lg h-12 px-5 text-xl "><Pencil/>Edit Crop</button>
              <button className="bg-[#2bed2b] flex items-center gap-2 rounded-lg h-12 px-5 text-xl "><PlusCircle/>Log Activity</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
