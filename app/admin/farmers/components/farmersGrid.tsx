import Image from "next/image";
import { Plots, FarmerDetails } from "@/app/components/utils/dummyData";
import { fullFarmerDetails, selectedPlot } from "../../utils/types";
import { MapPin, Phone, Sprout, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const FarmersCard = ({ farmer }: { farmer: fullFarmerDetails }) => {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-green-200">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-5">
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={farmer.farmerImage}
            alt={farmer.name}
            width={64}
            height={64}
            className="rounded-full object-cover ring-2 ring-green-100 group-hover:ring-green-300 transition-all flex-shrink-0"
          />

          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900">
              {farmer.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Farmer ID: {farmer.farmerId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Agent ID</p>
              <p className="text-sm font-medium text-gray-900">
                {farmer.agentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {farmer.locations[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-4 h-4 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Plots</p>
              <p className="text-sm font-medium text-gray-900">
                {farmer.noOfPlots}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Contact</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {farmer.phone}
              </p>
            </div>
          </div>
        </div>
        <Link href={`/admin/farmers/${farmer.farmerId}`}>
          <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            View Details
          </button>
        </Link>
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
  const [farmerDetails, setFarmerDetails] = useState<
    fullFarmerDetails[] | null
  >(null);
  const [filteredFarmerDetails, setFilteredFarmerDetails] = useState<
    fullFarmerDetails[] | null
  >(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getFarmerDets",
      );
      setFarmerDetails(res.data.data);
      console.log(res.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(searchValue, "MNake it pass the passion");
    if (farmerDetails) {
      const filteredPlots: fullFarmerDetails[] = farmerDetails.filter(
        (data) => {
          const search = searchValue.trim().toLowerCase();
          const searchMatch =
            search === "" ||
            String(data.farmerId).includes(search) ||
            data.name.toLowerCase().includes(search);

          const locationMatch =
            selectedLocation === "Select Area" ||
            data.locations.includes(selectedLocation);

          const cropMatch =
            selectedCrop === "Select Crop" || data.crops.includes(selectedCrop);

          return searchMatch && locationMatch && cropMatch;
        },
      );
      setFilteredFarmerDetails(filteredPlots);
    }
  }, [searchValue, selectedCrop, selectedLocation]);
  if (farmerDetails != null) {
    const dataRender = filteredFarmerDetails
      ? filteredFarmerDetails
      : farmerDetails;
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mt-10">
          {dataRender.map((farmer, i) => (
            <FarmersCard key={i} farmer={farmer} />
          ))}
        </div>
        {FarmerDetails.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No farmers found</p>
          </div>
        )}
      </div>
    );
  }
};
