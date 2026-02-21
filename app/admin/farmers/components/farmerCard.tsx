"use client";
import Image from "next/image";
import { FullFarmerDetails } from "../../utils/types";
import { MapPin, Phone, Sprout, User, Trash2 } from "lucide-react";
import Link from "next/link";
export const FarmersCard = ({
  data,
  onDeleteClick,
}: {
  data: FullFarmerDetails;
  onDeleteClick?: () => void;
}) => {
  console.log(data.crops);
  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-1000">
      <Link href={"farmers/" + data.farmerId}>
        <div className="p-5">
          <div className="flex gap-4 mb-4">
            <Image
              src={data.farmerPic}
              alt={data.farmerName}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold">{data.farmerName}</h3>
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
            {data.locations?.[0] && (
              <div className="flex gap-2 items-center">
                <MapPin size={16} />
                {data.locations[0]}
              </div>
            )}

            <div className="flex gap-2 items-center">
              <Sprout size={16} />
              {data.noOfPlots} Plots
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={16} />
              {data.phone}
            </div>
          </div>
          {data.crops && (
            <div className="mt-3 flex flex-wrap gap-2">
              {data.crops != undefined &&
                (() => {
                  const crops = data.crops;
                  return Object.keys(crops).map((crop, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs text-green-700 rounded"
                      style={{
                        backgroundColor: crops[crop] + "20",
                        color: `color-mix(in srgb, ${crops[crop]} 70%, black)`,
                      }}
                    >
                      {crop}
                    </span>
                  ));
                })()}
            </div>
          )}
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
