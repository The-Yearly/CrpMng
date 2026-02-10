"use client";

import Image from "next/image";

import { CropGridType } from "../../utils/cropTypes";
import { Leaf, Users, Map } from "lucide-react";

export const CropCard = ({ data }: { data: CropGridType }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-40 w-full">
        <Image
          src={data.cropImage}
          alt={data.cropName}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {data.cropName}
          </h3>
          <p className="text-sm text-gray-500">Season: {data.season}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-600" />
            <span>{data.stats.totalFarmers}</span>
          </div>

          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-blue-600" />
            <span>{data.stats.totalPlots}</span>
          </div>

          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-orange-600" />
            <span>{data.stats.totalArea} ac</span>
          </div>
        </div>

        <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition">
          View Crop Details
        </button>
      </div>
    </div>
  );
};

// export default function CropGrid({ searchValue }: { searchValue: string }) {
//   const filteredCrops = CropGridData.filter((e) =>
//     e.cropName.includes(searchValue.toUpperCase()),
//   );
//   if (filteredCrops.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">No crops available</div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 mt-10">
//       {filteredCrops.map((crop) => (
//         <CropCard key={crop.cropId} crop={crop} />
//       ))}
//     </div>
//   );
// }
