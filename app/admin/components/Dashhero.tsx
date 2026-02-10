"use client";
import { Users, Leaf, LandPlot, ChevronDown } from "lucide-react";
import { filterType } from "../farmers/page";

export default function Hero({
  welcomeMessage,
  searchValue,
  setSearchValue,
  filters,
  setFilters,
}: {
  welcomeMessage: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  filters: filterType[];
  setFilters: React.Dispatch<React.SetStateAction<filterType[]>>;
}) {
  const heroData = [
    {
      name: "Some Data1",
      percentage: "15%",
      style:
        "flex items-center px-4 w-28 h-12 text-white bg-gray-800 rounded-full",
    },
    {
      name: "Some Data2",
      percentage: "15%",
      style:
        "flex items-center px-4 w-28 h-12 text-black bg-amber-200 rounded-full",
    },
    {
      name: "Some Data3",
      percentage: "60%",
      style:
        "flex items-center justify-center w-64 h-12 border border-gray-400 rounded-full bg-[repeating-linear-gradient(45deg,#f5f5f5,#f5f5f5_10px,transparent_10px,transparent_20px)]",
    },
    {
      name: "Some Data4",
      percentage: "10%",
      style:
        "flex items-center justify-center w-28 h-12 border border-gray-400 rounded-full",
    },
  ];

  const employeeStats = [
    { value: 78, label: "Farmers", icon: Users },
    { value: 56, label: "Crops", icon: Leaf },
    { value: 203, label: "Farms", icon: LandPlot },
  ];

  return (
    <div className="mt-12 pl-8 flex w-full  items-start">
      <div className="flex flex-col w-full  ">
        <p className="text-6xl font-semibold">{welcomeMessage}</p>
        <div className="flex w-full justify-between space-x-4 mt-12">
          <div className="flex-col">
            <div className="flex">
              {heroData.map((data, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="mb-2 text-gray-600">{data.name}</p>
                  <div className={data.style}>
                    <p className="font-semibold">{data.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-white/90 mt-4 rounded-full h-12 px-4 shadow focus:outline-none"
              placeholder="Search Farmer (ID or Name)"
            />
            <div className="flex mt-2 ml-2 space-x-5">
              {filters.map((filter, i) => (
                <div key={i} className="relative w-48">
                  <div
                    onClick={() =>
                      setFilters((prev) =>
                        prev.map((item, index) =>
                          index === i
                            ? { ...item, filterDrop: !filter.filterDrop }
                            : item,
                        ),
                      )
                    }
                    className="bg-white flex items-center justify-between text-lg text-gray-600 shadow rounded-2xl px-2 h-8"
                  >
                    <p className="ml-2">{filter.filterSelected}</p>

                    <ChevronDown
                      className={`transition-transform ${filter.filterDrop ? "rotate-180" : ""}`}
                    />
                  </div>

                  {filter.filterDrop && (
                    <div className="absolute top-10 left-0 w-full bg-white shadow rounded-2xl p-2 z-10">
                      {filter.filterValue.map((dropDownValue, dropIndex) => (
                        <p
                          onClick={() => {
                            setFilters((prev) =>
                              prev.map((item, index) =>
                                index === i
                                  ? {
                                      ...item,
                                      filterDrop: !filter.filterDrop,
                                      filterSelected: dropDownValue,
                                    }
                                  : item,
                              ),
                            );
                          }}
                          key={dropIndex}
                          className="text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          {dropDownValue}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-16 pr-16">
            {employeeStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-end space-x-1 p-3">
                  <div className="bg-white p-2 rounded-full">
                    <stat.icon />
                  </div>
                  <p className="text-6xl font-bold">{stat.value}</p>
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
