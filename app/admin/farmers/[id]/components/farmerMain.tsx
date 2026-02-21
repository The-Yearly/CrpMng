"use client";
type Tab = "details" | "plots";
import { useState } from "react";
import { User, Layers } from "lucide-react";
import { newCreationForms } from "@/app/admin/utils/newCreation";
import { FullFarmerDetails, selectedPlot } from "@/app/admin/utils/types";
import { BigPageForm } from "@/app/admin/components/BigPageForm";
import dynamic from "next/dynamic";
import { colorData } from "@/app/admin/components/dashBoard";
const MapCard = dynamic(
  () =>
    import("@/app/admin/components/CardVarients/MapCard").then(
      (mod) => mod.MapCardClient,
    ),
  {
    ssr: false,
  },
);
export const FarmerMain = ({
  isEditing,
  farmer,
  setFarmer,
  plots,
  colorData,
  handleSave,
  handleCancel,
}: {
  isEditing: boolean;
  farmer: FullFarmerDetails;
  colorData: colorData;
  plots: selectedPlot[];
  setFarmer: React.Dispatch<React.SetStateAction<FullFarmerDetails>>;
  handleSave: () => void;
  handleCancel: () => void;
}) => {
  const [tab, setTab] = useState<Tab>("details");
  console.log(farmer, "Aley");
  return (
    <div className="flex-1 min-w-0 self-stretch">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] border border-stone-100 overflow-hidden h-full flex flex-col">
        <div className="flex items-end gap-1 border-b border-stone-100 px-6 pt-4 bg-stone-50/40">
          {(["details", "plots"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] rounded-t-xl transition-all ${
                tab === t
                  ? "bg-white text-stone-900 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] border border-b-white border-stone-100"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {t === "details" ? <User size={11} /> : <Layers size={11} />}
              Farmer {t === "details" ? "Details" : "Plots"}
              {tab === t && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-green-500 rounded-t-full" />
              )}
            </button>
          ))}

          {isEditing && (
            <span className="ml-auto mb-3 text-[8px] font-black uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full animate-pulse">
              ✦ Editing Mode
            </span>
          )}
        </div>

        {tab === "details" && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-[8px] font-black uppercase tracking-[0.28em] text-green-600 mb-1">
                Registration Process
              </p>
              <h3 className="text-xl font-black text-stone-900">
                Farmer Registration Details
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-medium">
                All information submitted during onboarding
              </p>
            </div>
            {
              <BigPageForm<FullFarmerDetails>
                activity={newCreationForms["Farmer"]}
                data={farmer}
                isEditing={isEditing}
                setData={setFarmer}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            }
          </div>
        )}

        {tab === "plots" && (
          // <div className="flex flex-col items-center justify-center py-28 gap-4 text-center px-8">
          //   <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100">
          //     <Layers size={26} className="text-green-600" />
          //   </div>
          //   <h3 className="text-xl font-black text-stone-800">Farmer Plots</h3>
          //   <p className="text-sm text-stone-400 max-w-xs font-medium leading-relaxed">
          //     Plot mapping and field management for{" "}
          //     <span className="font-bold text-stone-600">
          //       {farmer.farmerName}
          //     </span>{" "}
          //     will appear here.
          //   </p>
          //   <span className="text-[9px] font-black uppercase tracking-[0.25em] text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-full mt-1">
          //     Coming Soon
          //   </span>
          // </div>
          <div className="w-full h-full">
            <MapCard dataColors={colorData} Plots={plots} showFilter={true} />
          </div>
        )}
      </div>
    </div>
  );
};
