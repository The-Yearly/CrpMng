"use client";
import CropGrid from "./components/cropGrid";
import { useState } from "react";
import CropHero from "./components/cropHero";
export default function Crops(){
    const [selectedCrop, setSelectedCrop] = useState("Select Crop");
    const [selectedLocation, setSelectedLocation] = useState("Select Area");
    const [searchValue, setSearchValue] = useState("");
    return (
        <>
          <CropHero
            selectedCrop={selectedCrop}
            setSelectedCrop={setSelectedCrop}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <CropGrid
          />
        </>
      );
    }
    