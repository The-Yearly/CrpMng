"use client";
import React, { useState } from "react";
import { CropCard } from "./CardVarients/CropCard";
import dynamic from "next/dynamic";
import Hero from "./Dashhero";
import { filterType } from "../farmers/page";

const MapCard = dynamic(
  () => import("./CardVarients/MapCard").then((mod) => mod.MapCardClient),
  {
    ssr: false,
  },
);

export default function AdminDashboard() {
  const data = [<CropCard key={1} />, <MapCard key={2} />];
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  return (
    <>
      <Hero
        welcomeMessage="Welcome in, Admin"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="mt-12 px-10 gap-1 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {data.map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </div>
    </>
  );
}
