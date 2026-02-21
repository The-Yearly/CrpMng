"use client";

import Image from "next/image";
import { Users, Map } from "lucide-react";
import Link from "next/link";
import { CropGridType } from "../../utils/types";
import { Trash2 } from "lucide-react";
export const CropCard = ({
  data,
  onDeleteClick,
}: {
  data: CropGridType;
  onDeleteClick?: () => void;
}) => {
  return (
    <div className="relative z-100 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={"crops/" + data.cropId}>
        <div className="relative z-10 h-40 w-full">
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
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span>{data.stats.totalFarmers}</span>
            </div>

            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-600" />
              <span>{data.stats.totalPlots}</span>
            </div>

            {/* <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-orange-600" />
            <span>{data.stats.totalArea} ac</span>
          </div> */}
          </div>

          <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition">
            View Crop Details
          </button>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDeleteClick?.();
        }}
        className="absolute z-100 top-4 right-2 text-red-500  hover:text-red-700 hover:bg-gray-300/60 transition-colors p-3 rounded-full bg-white/30"
      >
        <Trash2 />
      </button>
    </div>
  );
};
