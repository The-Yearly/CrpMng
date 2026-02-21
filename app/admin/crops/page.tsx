"use client";
import { Grid } from "../components/grid";
import { CropCard } from "./components/cropCard";
import { useEffect, useState } from "react";
import Hero from "../components/Dashhero";
import { filterType } from "../utils/types";
import axios from "axios";
import { CropGridType } from "../utils/types";

interface newCropType {
  heading: string;
  inputs: {
    cropName: string;
    cropImage: string;
  };
}

export default function Crops() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([]);
  const [data, setData] = useState<CropGridType[]>([]);
  const newType: newCropType = {
    heading: "Add New Crop",
    inputs: {
      cropName: "text",
      cropImage: "url",
    },
  };
  const inputs = Object.keys(newType?.inputs || {});

  type formDataType = {
    [K in (typeof inputs)[number]]: string;
  };
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getCrops",
    );
    console.log("sd");
    setData(res.data.data);
  };

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
      <Grid<CropGridType, newCropType, formDataType>
        newData={"Crop"}
        searchValue={searchValue}
        searchColoumn="cropName"
        searchColoumn2="cropId"
        filters={filters}
        data={data}
        onDelete={async (item) => {
          try {
            const res = await axios.delete(
              process.env.NEXT_PUBLIC_BACKEND_URL +
                `/deleteCrop/${item.cropId}`,
            );

            return res.status;
          } catch (err) {
            console.error(err);
            return 404;
          }
        }}
        Card={CropCard}
        refreshData={fetchCrops}
        inputValues={newType}
        onAdd={async (item: formDataType) => {
          try {
            await axios.post(
              process.env.NEXT_PUBLIC_BACKEND_URL + "/addCrop",
              item,
            );
            return 200;
          } catch (err) {
            console.error(err);
            return 404;
          }
        }}
      />
    </>
  );
}
