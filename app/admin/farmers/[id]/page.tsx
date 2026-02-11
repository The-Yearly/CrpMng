"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import { 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Bell, 
  Maximize, 
  ClipboardCheck, 
  Zap, 
  ChevronDown, 
  ArrowLeft, 
  Phone 
} from "lucide-react";
import Link from "next/link";
import { fullFarmerDetails } from "../../utils/types";

// --- TYPES ---
interface ListRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  badge?: string;
  noBorder?: boolean;
}

// --- SUB-COMPONENTS ---
function ListRow({ icon, label, value, subValue, badge, noBorder }: ListRowProps) {
  return (
    <div className={`flex items-center justify-between py-5 px-4 rounded-2xl group cursor-pointer hover:bg-slate-50 transition-all ${noBorder ? '' : 'border-b border-slate-50'}`}>
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-black group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-slate-100 transition-all">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
          <div className="flex items-center gap-3">
            <p className="text-md font-bold text-black">{value}</p>
            {badge && (
              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
                {badge}
              </span>
            )}
          </div>
          {subValue && <p className="text-xs text-slate-400 font-medium mt-1">{subValue}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function FarmerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrapping params for Next.js 15
  const resolvedParams = use(params);
  const farmerId = resolvedParams.id;

  const [farmer, setFarmer] = useState<fullFarmerDetails | null>(null);
  const [activeCrop, setActiveCrop] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFarmerDets`);
        const allFarmers = res.data.data;
        
        // Find specific farmer
        const selected = allFarmers.find(
          (f: fullFarmerDetails) => String(f.farmerId) === farmerId
        );
        
        if (selected) {
          setFarmer(selected);
          setActiveCrop(selected.crops[0]);
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [farmerId]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-black" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Farmer Not Found</h1>
          <Link href="/admin/farmers" className="mt-4 inline-block text-sm font-bold text-green-600 underline">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      
      {/* Navigation */}
      <div className="w-full max-w-2xl mb-6">
        <Link 
          href="/admin/farmers" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-black transition-colors font-bold text-xs tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col h-[750px]">
        
        {/* 1. STICKY BRANDED HEADER */}
        <div className="bg-black p-8 flex-shrink-0 flex justify-between items-center border-b border-white/5">
          <div className="flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900 relative shadow-2xl">
              <Image 
                src={farmer.farmerImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"} 
                alt={farmer.name} 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{farmer.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">ID: {farmer.farmerId}</span>
                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">Agent {farmer.agentId}</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 shadow-inner">
            <Zap size={20} className="text-amber-400" fill="currentColor" />
          </div>
        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="p-8 pb-4">
            
            {/* Field Selection */}
            <div className="mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Field Selection</p>
              <div className="relative">
                <select 
                  value={activeCrop}
                  onChange={(e) => setActiveCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 pr-12 rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-black/5 transition-all outline-none"
                >
                  {farmer.crops.map(c => <option key={c} value={c}>{c} CULTIVATION</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Operational Data</p>
            
            {/* Data Rows */}
            <div className="space-y-1">
              <ListRow 
                icon={<MapPin size={20} />} 
                label="Primary Location" 
                value={farmer.locations[0]} 
                subValue="Main Registered Zone"
              />
              <ListRow 
                icon={<Phone size={20} />} 
                label="Contact" 
                value={farmer.phone} 
              />
              <ListRow 
                icon={<Maximize size={20} />} 
                label="Perimeter Mapping" 
                value={`${farmer.noOfPlots} Active Plots`} 
                subValue={`Managed land for ${activeCrop}`}
              />
              <ListRow 
                icon={<Calendar size={20} />} 
                label="Registration Date" 
                value="2025-08-14" 
              />
              <ListRow 
                icon={<Bell size={20} />} 
                label="Safety Status" 
                value="No Active Alerts" 
                badge="Safe"
              />
              <ListRow 
                icon={<ClipboardCheck size={20} />} 
                label="Reports" 
                value="View Audit Logs" 
                noBorder
              />
            </div>
          </div>
        </div>

        {/* 3. STICKY FOOTER */}
        <div className="p-8 bg-white border-t border-slate-100 flex-shrink-0">
          <button className="w-full bg-black text-white py-6 rounded-2xl font-bold text-base flex items-center justify-center gap-4 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl">
            GENERATE FULL AUDIT REPORT
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 20px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
      `}</style>
    </div>
  );
}