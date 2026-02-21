"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FullFarmerDetails, selectedPlot } from "../../utils/types";
import { FarmerSideCard } from "./components/farmerSideCard";
import { FarmerMain } from "./components/farmerMain";

export default function FarmerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const farmerId = resolvedParams.id;
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [farmer, setFarmer] = useState<FullFarmerDetails>({
    farmerName: "",
    gender: "",
    farmerFather: "",
    phone: "",
    farmCode: 0,
    country: "",
    state: "",
    district: "",
    tehsil: "",
    village: "",
    season: "",
    aadharNumber: "",
    farmerAge: 0,
    migrantStatus: "",
    landHoldingType: "",
    farmerAssociation: "",
    agentId: 0,
    farmerId: 0,
    farmerPic: farmerId,
    noOfPlots: 0,
    address: "",
  });
  const [plots, setPlots] = useState<selectedPlot[]>([]);
  const [editFarmer, setEditFarmer] = useState(farmer);
  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFarmerDets/` + farmerId,
        );
        const farmerResp = res.data.data;
        if (farmerResp) {
          setFarmer(farmerResp[0]);
          setEditFarmer(farmerResp[0]);
          const res = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              "/getPlotDetailsByFarmer/" +
              farmerResp[0].farmerId,
          );
          setPlots(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarmerData();
  }, [farmerId]);

  const handleSave = async () => {
    if (editFarmer) {
      const res = await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/updateFarmer",
        editFarmer,
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (farmer)
      setFarmer((prev) => ({
        ...prev,
        name: farmer.farmerName,
        phone: farmer.phone,
      }));
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-stone-200 border-t-green-600" />
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
            Loading Profile…
          </p>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900">
            Farmer Not Found
          </h1>
          <Link
            href="/admin/farmers"
            className="mt-4 inline-block text-sm font-bold text-green-600 underline"
          >
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-4 sm:px-6 py-5">
        <Link
          href="/admin/farmers"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors font-bold text-[10px] tracking-[0.2em] uppercase mb-8 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Directory
        </Link>
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <FarmerSideCard
            farmer={farmer}
            handleCancel={handleCancel}
            handleSave={handleSave}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <FarmerMain
            farmer={editFarmer}
            plots={plots}
            colorData={farmer.crops || {}}
            isEditing={isEditing}
            setFarmer={setEditFarmer}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        </div>
        <div className="h-12" />
      </div>
    </div>
  );
}
