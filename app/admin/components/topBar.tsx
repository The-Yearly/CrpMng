"use client";

import { Settings, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TopBar() {
  const pathname = usePathname();
  const dashboardItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Plantings", href: "/admin/plantings" },
    { label: "Farmers", href: "/admin/farmers" },
    { label: "Crops", href: "/admin/crops" },
    { label: "Water", href: "/admin/water" },
    { label: "Food", href: "/admin/food" },
    { label: "Waste", href: "/admin/waste" },
    { label: "Goods", href: "/admin/goods" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="flex justify-between items-center mt-5 ml-3 ">
      <div className="border border-neutral-400 rounded-3xl px-4 py-2">
        <p className="text-xl font-light">Crop App</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-white/50 shadow overflow-hidden flex items-center h-14 space-x-2 rounded-full">
          {dashboardItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center px-4 h-10 rounded-full transition-colors ${
                item.href === pathname
                  ? "bg-gray-900 h-full text-white"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="bg-white/50 shadow flex items-center h-14 px-4 space-x-2 rounded-full hover:bg-white/70 transition">
          <Settings className="w-5 h-5" />
          <p className="text-sm font-medium">Settings</p>
        </div>

        <div className="bg-white/50 shadow flex items-center justify-center h-14 w-14 rounded-full hover:bg-white/70 transition">
          <Bell className="w-5 h-5" />
        </div>
        <div className="bg-white/50 shadow flex items-center justify-center h-14 w-14 rounded-full hover:bg-white/70 transition">
          <User className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
