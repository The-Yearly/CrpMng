"use client";
import { Grid } from "../components/grid";
import { CropCard } from "./components/cropCard";
import { useEffect, useState } from "react";
import Hero from "../components/Dashhero";
import { filterType } from "../farmers/page";
import axios from "axios";
import { CropGridType } from "../utils/types";
export default function Crops() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  const [data, setData] = useState<CropGridType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getCrops",
      );
      setData(res.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Hero
        filters={filters}
        setFilters={setFilters}
        welcomeMessage="Search Crops"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchBarPlaceHolder="Search Crops (ID or Name)"
      />
      <Grid
        searchValue={searchValue}
        searchColoumn={"cropName"}
        searchColoumn2={"cropId"}
        filters={filters}
        datatype={"CropGridType"}
        data={data}
        Card={CropCard}
      />
    </>
  );
}
