import { FullFarmerDetails } from "@/app/admin/utils/types";
import {
  BadgeCheck,
  Map,
  Phone,
  MapPin,
  Wheat,
  Pencil,
  X,
  Check,
} from "lucide-react";
import Image from "next/image";
export const StatChip = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3 bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100">
      <div className="w-8 h-8 rounded-xl bg-green-600/10 flex items-center justify-center text-green-700 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-stone-400 leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-black text-stone-800 leading-none truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export const FarmerSideCard = ({
  farmer,
  isEditing,
  setIsEditing,
  handleSave,
  handleCancel,
}: {
  farmer: FullFarmerDetails;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  handleCancel: () => void;
}) => {
  console.log(farmer.crops);
  return (
    <div className="w-full lg:w-80 xl:w-96  flex-shrink-0 self-stretch">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] border border-stone-100 overflow-hidden h-full flex flex-col">
        <div className="relative bg-gradient-to-br from-green-700 via-green-800 to-green-950 px-8 pt-8 pb-24 flex-shrink-0">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute top-8 right-6 w-20 h-20 rounded-full bg-white/5" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-black/10" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-green-400/80 mb-1">
                Farmer Profile
              </p>
              <p className="text-xs font-bold text-green-200/60">Admin View</p>
            </div>
            <span className="flex items-center gap-1.5 bg-black/25 text-green-200 text-[8px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center -mt-16 px-8 pb-8 flex-1">
          <div className="relative mb-5">
            <div className="w-36 h-36 rounded-full overflow-hidden border-[5px] border-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] bg-stone-200 relative">
              <Image
                src={
                  farmer.farmerPic ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                }
                alt={farmer.farmerName}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-green-600 border-[3px] border-white flex items-center justify-center shadow-lg">
              <BadgeCheck
                size={16}
                className="text-white"
                fill="currentColor"
              />
            </div>
          </div>

          <h2 className="text-2xl font-black text-stone-900 text-center tracking-tight leading-tight">
            {farmer.farmerName}
          </h2>
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1.5 text-center">
            ID #{farmer.farmerId} · Agent #{farmer.agentId}
          </p>

          <div className="w-full h-px bg-stone-100 my-6" />

          <div className="w-full flex flex-col gap-3">
            <StatChip
              label="Active Plots"
              value={farmer.noOfPlots}
              icon={<Map size={15} />}
            />

            <StatChip
              label="Primary Location"
              value={farmer.locations?.[0] ?? "—"}
              icon={<MapPin size={15} />}
            />
            {farmer.phone && (
              <StatChip
                label="Phone"
                value={farmer.phone}
                icon={<Phone size={15} />}
              />
            )}
          </div>

          <div className="w-full h-px bg-stone-100 my-6" />

          <div className="w-full">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-stone-400 mb-3">
              Crops
            </p>

            <div className="flex flex-wrap gap-2">
              {farmer.crops ? (
                (
            <div className="mt-3 flex flex-wrap gap-2">
              {farmer.crops != undefined &&
                (() => {
                  const crops = farmer.crops;
                  return Object.keys(crops).map((crop, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs text-green-700 rounded"
                      style={{
                        backgroundColor: crops[crop] + "20",
                        color: `color-mix(in srgb, ${crops[crop]} 80%, black)`,
                      }}
                    >
                      {crop}
                    </span>
                  ));
                })()}
            </div>
          )
              ) : (
                <span className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl">
                  No Crops
                </span>
              )}
            </div>
          </div>

          <div className="flex-1" />

          <div className="w-full h-px bg-stone-100 my-6" />

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-[10px] font-black uppercase tracking-[0.18em] py-4 rounded-2xl transition-all active:scale-[0.97] shadow-lg"
            >
              <Pencil size={14} /> Edit Details
            </button>
          ) : (
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-[10px] font-black uppercase tracking-[0.18em] py-4 rounded-2xl transition-all active:scale-[0.97] shadow-lg"
              >
                <Check size={14} /> Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-500 text-[10px] font-black uppercase tracking-[0.18em] py-3.5 rounded-2xl transition-all"
              >
                <X size={14} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
