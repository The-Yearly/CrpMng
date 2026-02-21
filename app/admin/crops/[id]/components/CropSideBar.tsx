import { IndivitualCrop, selectedPlot } from "@/app/admin/utils/types";
import dynamic from "next/dynamic";
import Image from "next/image";
export const CropSideBar = ({
  crop,
  plots,
}: {
  crop: IndivitualCrop;
  plots: selectedPlot[];
}) => {
  const MapCard = dynamic(
    () =>
      import("../../../components/CardVarients/MapCard").then(
        (mod) => mod.MapCardClient,
      ),
    {
      ssr: false,
    },
  );
  return (
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
          <p className="text-xl text-gray-700/70">DURATION</p>
          <p className="mt-2 text-4xl font-serif text-black">10</p>
        </div>
        <div className="flex w-1/2 py-5 border-gray-300/80 border-1 flex-col items-center justify-center">
          <p className="text-xl text-gray-700/70">PROJECTED YEILD</p>
          <p className="mt-2 text-4xl font-serif text-black">10</p>
        </div>
      </div>

      <div className="flex-grow px-8 py-8">
        {plots.length != 0 && (
          <MapCard
            dataColors={{ [crop.cropName]: crop.cropColor }}
            showFilter={false}
            Plots={plots}
            key={1}
          />
        )}
      </div>
    </div>
  );
};
