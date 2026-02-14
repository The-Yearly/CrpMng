"use client";
import React, { useState, useEffect } from "react";
import { CropCard } from "./CardVarients/CropCard";
import dynamic from "next/dynamic";
import Hero from "./Dashhero";
import { filterType } from "../farmers/page";
import axios from "axios";
import { selectedPlot } from "../utils/types";
const MapCard = dynamic(
  () => import("./CardVarients/MapCard").then((mod) => mod.MapCardClient),
  {
    ssr: false,
  },
);

export default function AdminDashboard() {
  const [plots, setPlots] = useState<selectedPlot[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getMapDetails",
      );
      console.log(res.data);
      setPlots(res.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Hero
        welcomeMessage="Welcome in, Admin"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filters={filters}
        setFilters={setFilters}
        searchBarPlaceHolder={"Search"}
      />
      <div className="mt-12 px-10 gap-1 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        <CropCard />
        <div className=" bg-amber-100 col-span-1 md:col-span-2 rounded-2xl overflow-hidden min-h-[300px] w-full ">
          {plots.length != 0 && <MapCard showFilter={true} Plots={plots} />}
        </div>
      </div>
    </>
  );
}
