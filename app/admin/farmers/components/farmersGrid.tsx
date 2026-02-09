"use client";

import Image from "next/image";
import { FarmerDetails } from "@/app/components/utils/dummyData";
import { fullFarmerDetails } from "../../utils/types";
import { MapPin, Phone, Sprout, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const FarmersCard = ({ farmer }: { farmer: fullFarmerDetails }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition">
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          <Image
            src={farmer.farmerImage}
            alt={farmer.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">{farmer.name}</h3>
            <p className="text-sm text-gray-500">
              Farmer ID: {farmer.farmerId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex gap-2 items-center">
            <User size={16} />
            {farmer.agentId}
          </div>

          <div className="flex gap-2 items-center">
            <MapPin size={16} />
            {farmer.locations[0]}
          </div>

          <div className="flex gap-2 items-center">
            <Sprout size={16} />
            {farmer.noOfPlots} Plots
          </div>

          <div className="flex gap-2 items-center">
            <Phone size={16} />
            {farmer.phone}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {farmer.crops.map((crop) => (
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

export const FarmersGrid = ({
  selectedCrop,
  selectedLocation,
  searchValue,
}: {
  selectedCrop: string;
  selectedLocation: string;
  searchValue: string;
}) => {
  const [farmers, setFarmers] = useState<fullFarmerDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/getFarmerDets"
        );
        setFarmers(res.data.data);
      } catch {
        // fallback to dummy data
        setFarmers(FarmerDetails as fullFarmerDetails[]);
      }
    };
    fetchData();
  }, []);

  const filteredFarmers = farmers.filter((f) => {
    const search = searchValue.toLowerCase().trim();

    const searchMatch =
      !search ||
      f.name.toLowerCase().includes(search) ||
      String(f.farmerId).includes(search);

    const locationMatch =
      selectedLocation === "Select Area" ||
      f.locations.includes(selectedLocation);

    const cropMatch =
      selectedCrop === "Select Crop" ||
      f.crops.includes(selectedCrop.toUpperCase() as any);

    return searchMatch && locationMatch && cropMatch;
  });

  if (filteredFarmers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No farmers found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mt-10">
      {filteredFarmers.map((farmer) => (
        <FarmersCard key={farmer.farmerId} farmer={farmer} />
      ))}
    </div>
  );
};
