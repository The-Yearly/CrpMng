"use client";
import { Grid } from "../components/grid";
import { useState, useEffect } from "react";
import Hero from "../components/Dashhero";
import { FullFarmerDetails } from "../utils/types";
import { FarmersCard } from "./components/farmerCard";
import axios from "axios";
export interface filterType {
  filterColoumnName: string;
  filterValue: string[];
  filterDrop: boolean;
  filterSelected: string;
}
const crops = ["Select Crop", "CHILLI", "TURMERIC", "GINGER", "MARIGOLD"];
const locations = [
  "Select Area",
  "Kochi",
  "Thiruvananthapuram",
  "Kozhikode",
  "Thrissur",
  "Alappuzha",
  "Kottayam",
  "Palakkad",
  "Kannur",
];

interface newFarmerType {
  heading: string;
  inputs: {
    farmerName: string;
    farmerImage: string;
  };
}

export default function FarmerDetails() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<filterType[]>([
    {
      filterColoumnName: "crops",
      filterValue: crops,
      filterDrop: false,
      filterSelected: crops[0],
    },
    {
      filterColoumnName: "locations",
      filterValue: locations,
      filterDrop: false,
      filterSelected: locations[0],
    },
  ]);
  const [farmerDetails, setFarmerDetails] = useState<
    FullFarmerDetails[] | null
  >(null);

  const newType: newFarmerType = {
    heading: "Add New Farmer",
    inputs: {
      farmerName: "text",
      farmerImage: "url",
    },
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/getFarmerDets",
    );
    setFarmerDetails(res.data.data);
    console.log(res.data.data);
  };
  const inputs = Object.keys(newType?.inputs || {});

  type formDataType = {
    [K in (typeof inputs)[number]]: string;
  };
  return (
    <>
      {farmerDetails && (
        <>
          <Hero
            welcomeMessage="Search Farmers"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            filters={filters}
            setFilters={setFilters}
            searchBarPlaceHolder={"Search Farmers (ID or Name)"}
          />
          <Grid<FullFarmerDetails, newFarmerType, formDataType>
            newData={"Farmer"}
            searchValue={searchValue}
            filters={filters}
            data={farmerDetails}
            Card={FarmersCard}
            searchColoumn="farmerName"
            searchColoumn2="farmerId"
            onDelete={async (item) => {
              try {
                const res = await axios.delete(
                  process.env.NEXT_PUBLIC_BACKEND_URL +
                    `/deleteFarmer/${item.farmerId}`,
                );

                return res.status;
              } catch (err) {
                console.error(err);
                return 404;
              }
            }}
            refreshData={fetchData}
            inputValues={newType}
            onAdd={async (item: formDataType) => {
              try {
                await axios.post(
                  process.env.NEXT_PUBLIC_BACKEND_URL + "/addFarmer",
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
      )}
    </>
  );
}
