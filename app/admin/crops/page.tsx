"use client";
import { Grid } from "../components/grid";
import { CropCard } from "./components/cropCard";
import { useEffect, useState } from "react";
import Hero from "../components/Dashhero";
import { filterType } from "../utils/types";
import axios from "axios";
import { CropGridType } from "../utils/types";
import { Plus, X } from "lucide-react";

export default function Crops() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  const [data, setData] = useState<CropGridType[]>([]);
  const [overlay, showOverLay] = useState(false);


  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getCrops"
    );
    setData(res.data.data);
  };

  // const handleAddCrop = async () => {
  //   try {
  //     await axios.post(
  //       process.env.NEXT_PUBLIC_BACKEND_URL + "/addCrop",formData
  //     );
  //     showOverLay(false);
  //     fetchCrops();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
<Grid<CropGridType>
  searchValue={searchValue}
  searchColoumn="cropName"
  searchColoumn2="cropId"
  filters={filters}
  data={data}
  onDelete={async (item) => {
      try {
        const res = await axios.delete(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/deleteCrop/${item.cropId}`
        );

        return res.status;
      } catch (err) {
        console.error(err);
        return 404;
      }
    }}
  Card={CropCard}
  refreshData={fetchCrops}
  onAddClick={async (item) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/addCrop",item
      );
      showOverLay(false);
      fetchCrops();
    } catch (err) {
      console.error(err);
    }}}
/>
      
    </>
  );
}
