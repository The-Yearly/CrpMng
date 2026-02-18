"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import {
  ArrowLeft,
  Pencil,
  X,
  Check,
  User,
  Phone,
  MapPin,
  Hash,
  Globe,
  Map,
  Landmark,
  TreePine,
  Home,
  Sun,
  ShieldCheck,
  Users,
  Layers,
  IdCard,
  Calendar,
  Wheat,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { fullFarmerDetails } from "../../utils/types";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Tab = "details" | "plots";

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  isEditing?: boolean;
  editNode?: React.ReactNode;
}

// ─── FIELD ROW ─────────────────────────────────────────────────────────────────
function FieldRow({ icon, label, value, isEditing, editNode }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1.5 py-4 border-b border-dashed border-stone-100 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-green-600 opacity-70">{icon}</span>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 leading-none">
          {label}
        </p>
      </div>
      {isEditing && editNode ? (
        editNode
      ) : (
        <p className="text-sm font-semibold text-stone-800 pl-6">
          {value ?? (
            <span className="text-stone-300 font-normal italic text-xs">
              Not provided
            </span>
          )}
        </p>
      )}
    </div>
  );
}

function EditInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ml-6 w-[calc(100%-1.5rem)] text-sm font-semibold text-stone-800 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-300 transition-all"
    />
  );
}

function EditSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ml-6 w-[calc(100%-1.5rem)] text-sm font-semibold text-stone-800 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-300 transition-all"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

// ─── STAT CHIP ──────────────────────────────────────────────────────────────────
function StatChip({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
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
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function FarmerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const farmerId = resolvedParams.id;

  const [farmer, setFarmer] = useState<fullFarmerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("details");
  const [isEditing, setIsEditing] = useState(false);

  const [editState, setEditState] = useState({
    name: "",
    gender: "Male",
    fatherName: "Ramesh Kumar",
    phone: "",
    farmerCode: "",
    country: "India",
    state: "Telangana",
    district: "Warangal",
    tehsil: "Hanamkonda",
    village: "Kothapet",
    season: "Kharif 2025",
    aadhar: "XXXX XXXX 4521",
    age: "42",
    migrantStatus: "Local",
    landHolding: "4.5 Acres (Own)",
    association: "Telangana Rytu Sangham",
  });

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFarmerDets`
        );
        const allFarmers = res.data.data;
        const selected = allFarmers.find(
          (f: fullFarmerDetails) => String(f.farmerId) === farmerId
        );
        if (selected) {
          setFarmer(selected);
          setEditState((prev) => ({
            ...prev,
            name: selected.name,
            phone: selected.phone,
            farmerCode: String(selected.farmerId),
          }));
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarmerData();
  }, [farmerId]);

  const handleSave = () => {
    if (farmer)
      setFarmer({ ...farmer, name: editState.name, phone: editState.phone });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (farmer)
      setEditState((prev) => ({
        ...prev,
        name: farmer.name,
        phone: farmer.phone,
      }));
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f2f4ee]">
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
      <div className="flex h-screen w-full items-center justify-center bg-[#f2f4ee]">
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
    <div className="min-h-screen bg-[#f2f4ee]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* ── BACK LINK ── */}
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

        {/* ══ TWO-COLUMN LAYOUT ══ */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* ══════════════════════════════════
              LEFT COLUMN — full-height profile card
          ══════════════════════════════════ */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 self-stretch">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] border border-stone-100 overflow-hidden h-full flex flex-col">

              {/* Green header — taller, more dramatic */}
              <div className="relative bg-gradient-to-br from-green-700 via-green-800 to-green-950 px-8 pt-8 pb-24 flex-shrink-0">
                {/* Decorative rings */}
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute top-8 right-6 w-20 h-20 rounded-full bg-white/5" />
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-black/10" />

                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-green-400/80 mb-1">
                      Farmer Profile
                    </p>
                    <p className="text-xs font-bold text-green-200/60">
                      Admin View
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 bg-black/25 text-green-200 text-[8px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>

              {/* Avatar + info — overlaps the green header, grows to fill remaining space */}
              <div className="flex flex-col items-center -mt-16 px-8 pb-8 flex-1">

                {/* Big avatar circle */}
                <div className="relative mb-5">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-[5px] border-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] bg-stone-200 relative">
                    <Image
                      src={
                        farmer.farmerImage ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                      }
                      alt={farmer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-green-600 border-[3px] border-white flex items-center justify-center shadow-lg">
                    <BadgeCheck size={16} className="text-white" fill="currentColor" />
                  </div>
                </div>

                <h2 className="text-2xl font-black text-stone-900 text-center tracking-tight leading-tight">
                  {farmer.name}
                </h2>
                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1.5 text-center">
                  ID #{farmer.farmerId} · Agent #{farmer.agentId}
                </p>

                <div className="w-full h-px bg-stone-100 my-6" />

                {/* Stat chips */}
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
                  <StatChip
                    label="Phone"
                    value={farmer.phone}
                    icon={<Phone size={15} />}
                  />
                </div>

                <div className="w-full h-px bg-stone-100 my-6" />

                {/* Crops */}
                <div className="w-full">
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-stone-400 mb-3">
                    Crops
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {farmer.crops.map((c) => (
                      <span
                        key={c}
                        className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl"
                      >
                        <Wheat size={10} />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer pushes edit button to bottom */}
                <div className="flex-1" />

                <div className="w-full h-px bg-stone-100 my-6" />

                {/* Edit / Save / Cancel */}
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

          {/* ══════════════════════════════════
              RIGHT COLUMN — tabs + content
          ══════════════════════════════════ */}
          <div className="flex-1 min-w-0 self-stretch">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] border border-stone-100 overflow-hidden h-full flex flex-col">

              {/* ── TAB BAR ── */}
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
                    {t === "details" ? (
                      <User size={11} />
                    ) : (
                      <Layers size={11} />
                    )}
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

              {/* ── DETAILS TAB ── */}
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

                  {/* 2-col fields grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                    <FieldRow
                      icon={<User size={13} />}
                      label="Farmer Name"
                      value={editState.name}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.name}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, name: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<User size={13} />}
                      label="Gender"
                      value={editState.gender}
                      isEditing={isEditing}
                      editNode={
                        <EditSelect
                          value={editState.gender}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, gender: v }))
                          }
                          options={["Male", "Female", "Other"]}
                        />
                      }
                    />
                    <FieldRow
                      icon={<Users size={13} />}
                      label="Father Name"
                      value={editState.fatherName}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.fatherName}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, fatherName: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Phone size={13} />}
                      label="Mobile Number"
                      value={editState.phone}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.phone}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, phone: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Hash size={13} />}
                      label="Farmer Code"
                      value={editState.farmerCode}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.farmerCode}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, farmerCode: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Globe size={13} />}
                      label="Country"
                      value={editState.country}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.country}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, country: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Map size={13} />}
                      label="State"
                      value={editState.state}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.state}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, state: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Landmark size={13} />}
                      label="District"
                      value={editState.district}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.district}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, district: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<MapPin size={13} />}
                      label="Tehsil / Mandal"
                      value={editState.tehsil}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.tehsil}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, tehsil: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Home size={13} />}
                      label="Village"
                      value={editState.village}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.village}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, village: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Sun size={13} />}
                      label="Season"
                      value={editState.season}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.season}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, season: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<IdCard size={13} />}
                      label="Aadhar Number"
                      value={editState.aadhar}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.aadhar}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, aadhar: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Calendar size={13} />}
                      label="Farmer Age"
                      value={`${editState.age} yrs`}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.age}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, age: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<ShieldCheck size={13} />}
                      label="Migrant or Local"
                      value={editState.migrantStatus}
                      isEditing={isEditing}
                      editNode={
                        <EditSelect
                          value={editState.migrantStatus}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, migrantStatus: v }))
                          }
                          options={["Local", "Migrant"]}
                        />
                      }
                    />
                    <FieldRow
                      icon={<TreePine size={13} />}
                      label="Land Holding — Own / Lease"
                      value={editState.landHolding}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.landHolding}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, landHolding: v }))
                          }
                        />
                      }
                    />
                    <FieldRow
                      icon={<Users size={13} />}
                      label="Farmer Association"
                      value={editState.association}
                      isEditing={isEditing}
                      editNode={
                        <EditInput
                          value={editState.association}
                          onChange={(v) =>
                            setEditState((p) => ({ ...p, association: v }))
                          }
                        />
                      }
                    />
                  </div>

                  {/* Bottom save bar — only in edit mode */}
                  {isEditing && (
                    <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all"
                      >
                        <X size={13} /> Discard
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                      >
                        <Check size={13} /> Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── PLOTS TAB ── */}
              {tab === "plots" && (
                <div className="flex flex-col items-center justify-center py-28 gap-4 text-center px-8">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100">
                    <Layers size={26} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-black text-stone-800">
                    Farmer Plots
                  </h3>
                  <p className="text-sm text-stone-400 max-w-xs font-medium leading-relaxed">
                    Plot mapping and field management for{" "}
                    <span className="font-bold text-stone-600">
                      {farmer.name}
                    </span>{" "}
                    will appear here.
                  </p>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-full mt-1">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}