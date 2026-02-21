"use client";
import { selectedPlot } from "../../utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { LatLngTuple } from "leaflet";
import React from "react";
import {
  Marker,
  TileLayer,
  Popup,
  MapContainer,
  useMap,
  Polygon,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
const crops = ["Select Crop", "CHILLI", "TURMERIC", "GINGER", "MARIGOLD"];
const colourOptions = {
  CHILLI: { color: "red", fillOpacity: 0.6 },
  TURMERIC: { color: "yellow", fillOpacity: 0.8 },
  GINGER: { color: "green", fillOpacity: 0.6 },
  MARIGOLD: { color: "orange", fillOpacity: 0.6 },
};

const markerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const centerCalculator = (vertices: LatLngTuple[]): LatLngTuple => {
  if (vertices.length < 3) return vertices[0];

  const lat0 = vertices[0][0];
  const lng0 = vertices[0][1];

  let sumX = 0;
  let sumY = 0;

  vertices.forEach(([lat, lng]) => {
    const x = (lng - lng0) * 111320 * Math.cos((lat0 * Math.PI) / 180);
    const y = (lat - lat0) * 111320;
    sumX += x;
    sumY += y;
  });
  const cx = sumX / vertices.length;
  const cy = sumY / vertices.length;
  const centerLng = lng0 + cx / (111320 * Math.cos((lat0 * Math.PI) / 180));
  const centerLat = lat0 + cy / 111320;

  return [centerLat, centerLng];
};

const AreaCalculator = (vertices: LatLngTuple[]): number => {
  if (vertices.length < 3) return 0;
  const lat0 = vertices[0][0];
  const meterVertices = vertices.map(([lat, lon]) => {
    const x =
      (lon - vertices[0][1]) * 111320 * Math.cos((lat0 * Math.PI) / 180);
    const y = (lat - vertices[0][0]) * 111320;
    return [x, y];
  });
  const n = meterVertices.length;
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < n - 1; i++) {
    sum1 += meterVertices[i][0] * meterVertices[i + 1][1];
    sum2 += meterVertices[i][1] * meterVertices[i + 1][0];
  }
  sum1 += meterVertices[n - 1][0] * meterVertices[0][1];
  sum2 += meterVertices[n - 1][1] * meterVertices[0][0];

  let area = Math.abs(sum1 - sum2) / 2;
  area = Number(area.toFixed(3));
  return area;
};
const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    if (!lat || !lng) return;
    map.flyTo([lat, lng], map.getZoom(), { duration: 2 });
  }, [lat, lng, map]);

  return null;
};

export const MapCardClient = ({
  Plots,
  showFilter,
}: {
  Plots: selectedPlot[];
  showFilter: boolean;
}) => {
  const cardAnimationLeft = {
    x: -100,
    opacity: 0,
  };
  const cardAnimationDown = {
    y: 100,
    opacity: 0,
  };
  const [currentLocation, setCurrentLocation] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("Select Crop");
  const [selectedPlot, setSelectedPlot] = useState<selectedPlot | null>(null);
  const [exitDir, setExitdir] = useState<"Right" | "Down">("Down");

  if (Plots != null) {
    const selectedCropPlot: selectedPlot[] = Plots.filter((area) =>
      selectedCrop != "Select Crop"
        ? area.crop == selectedCrop
        : area.crop.includes(""),
    );

    const validLocations = Object.values(
      Plots.filter((area) =>
        selectedCrop !== "Select Crop" ? area.crop === selectedCrop : true,
      ).reduce(
        (acc, curr) => {
          if (!acc[curr.location]) {
            acc[curr.location] = curr;
          }
          return acc;
        },
        {} as Record<string, (typeof Plots)[number]>,
      ),
    );

    const changePosPlus = () => {
      setCurrentLocation((prev) => (prev + 1) % validLocations.length);
    };

    const changePosMinus = () => {
      setCurrentLocation((prev) =>
        prev === 0 ? validLocations.length - 1 : prev - 1,
      );
    };
    console.log(validLocations);
    return (
      <div className="bg-white rounded-2xl flex w-full h-full md:w-full flex-col relative  overflow-hidden  ">
        <MapContainer
          className="z-10 h-full w-full"
          center={[
            validLocations[currentLocation].plot[0][0],
            validLocations[currentLocation].plot[0][1],
          ]}
          zoom={30}
          scrollWheelZoom={false}
        >
          <MapUpdater
            lat={validLocations[currentLocation].plot[0][0]}
            lng={validLocations[currentLocation].plot[0][1]}
          />

          <TileLayer
            attribution="© Esri, Maxar, Earthstar Geographics"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {/* <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.3}
        /> */}
          {selectedCropPlot.map((area, i) => {
            const center: LatLngTuple = centerCalculator(area.plot);
            return (
              <React.Fragment key={i}>
                <Polygon
                  positions={area.plot}
                  pathOptions={
                    colourOptions[area.crop as keyof typeof colourOptions]
                  }
                  eventHandlers={{
                    click: () => {
                      console.log(area);
                      setExitdir("Right");
                      setSelectedPlot({
                        ...area,
                        name: area.name,
                        farmerImage: area.farmerImage,
                        noOfPlots: area.noOfPlots,
                        phone: area.phone,
                      });
                    },
                  }}
                >
                  <Tooltip>{area.crop}</Tooltip>
                </Polygon>
                <Marker position={[center[0], center[1]]} icon={markerIcon}>
                  <Popup>{area.location}</Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        <div className="absolute  bottom-4 right-4 z-20 w-64 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-between px-4 py-3">
          <button
            onClick={changePosMinus}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-lg font-semibold text-gray-800 text-center flex-1">
            {validLocations[currentLocation].location}
          </h1>
          <button
            onClick={changePosPlus}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="absolute top-5 left-15 w-42 z-10 bg-white rounded-md shadow-md flex flex-col">
          {showFilter && (
            <button
              className="flex items-center justify-between px-3 py-1 w-full"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <span>{selectedCrop} </span>
              <ChevronDown
                className={`transition-transform ${showDropDown ? "rotate-180" : ""}`}
              />
            </button>
          )}

          <AnimatePresence>
            {showDropDown && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="flex flex-col border-t border-gray-200 overflow-hidden"
              >
                {crops.map((crop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSelectedCrop(crop);
                      setCurrentLocation(0);
                      setShowDropDown(false);
                    }}
                  >
                    {crop}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="bg-gray-100 z-20 absolute top-4 right-4 hover:bg-gray-200 transition-colors rounded-full p-2">
          <ArrowUpRight className="w-5 h-5 text-gray-700" />
        </button>
        <AnimatePresence>
          {selectedPlot && (
            <motion.div
              key={String(selectedPlot.plotId)}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              exit={exitDir == "Down" ? cardAnimationDown : cardAnimationLeft}
              className="absolute bottom-4 left-4 w-64 md:w-72 z-20 bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="w-full h-24 md:h-32 relative">
                <button
                  className="absolute z-10 rounded-full right-2 top-2 w-8 h-8 flex items-center justify-center transition-colors bg-gray-50 hover:bg-gray-200"
                  onClick={() => {
                    setExitdir("Down");
                    setTimeout(() => setSelectedPlot(null));
                  }}
                >
                  <X strokeWidth={1.5} />
                </button>
                <Image
                  alt="Plot Image"
                  src={selectedPlot.plotImage}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative p-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-xs md:text-sm font-semibold text-gray-800">
                    Farmer: {selectedPlot.name}
                  </h3>
                  <p className="text-xs text-gray-500">Plot Info</p>
                </div>
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-200">
                  <Image
                    alt="Farmer Image"
                    src={selectedPlot.farmerImage}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="px-2 pb-2 text-xs md:text-sm text-gray-700 flex justify-between">
                <span>Area:{AreaCalculator(selectedPlot.plot)}m²</span>
                <span>Crop: {selectedPlot.crop}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};
