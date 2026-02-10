"use client";
import Image from "next/image";
import { FullFarmerDetails } from "../../utils/types";
import { MapPin, Phone, Sprout, User } from "lucide-react";

export const FarmersCard = ({ data }: { data: FullFarmerDetails }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition">
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          <Image
            src={data.farmerImage}
            alt={data.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-500">
              Farmer ID: {data.farmerId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex gap-2 items-center">
            <User size={16} />
            {data.agentId}
          </div>

          <div className="flex gap-2 items-center">
            <MapPin size={16} />
            {data.locations[0]}
          </div>

          <div className="flex gap-2 items-center">
            <Sprout size={16} />
            {data.noOfPlots} Plots
          </div>

          <div className="flex gap-2 items-center">
            <Phone size={16} />
            {data.phone}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {data.crops.map((crop) => (
            <span
              key={crop}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
            >
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
