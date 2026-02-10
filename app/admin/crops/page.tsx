"use client";
import { Grid } from "../components/grid";
import { CropGridData } from "@/app/components/utils/cropDummyData";
import { CropCard } from "./components/cropGrid";
import { useState } from "react";
import Hero from "../components/Dashhero";
import { filterType } from "../farmers/page";
export default function Crops() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  return (
    <>
      <Hero
        filters={filters}
        setFilters={setFilters}
        welcomeMessage="Search Crops"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Grid 
              searchValue={searchValue}
              filters={filters}
              datatype={"CropGridType"}
              data={CropGridData}
              Card={CropCard}/>
    </>
  );
}
