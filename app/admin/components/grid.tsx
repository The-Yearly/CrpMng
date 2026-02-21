"use client";

import { filterType } from "../utils/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, X, Plus } from "lucide-react";
import { Form } from "./Form";
import { newCreationForms, newCreationType } from "../utils/newCreation";
export const Grid = <
  T extends { [key: string]: any },
  A extends { [key: string]: any },
  C extends { [key: string]: any },
>({
  searchValue,
  filters,
  data,
  Card,
  searchColoumn,
  searchColoumn2,
  inputValues,
  newData,
  onAdd,
  onDelete,
  refreshData,
}: {
  filters: filterType[];
  searchValue: string;
  data: T[];
  Card: React.ComponentType<{ data: T; onDeleteClick?: () => void }>;
  searchColoumn: keyof T;
  inputValues?: A;
  newData: string;
  searchColoumn2: keyof T;
  onAdd?: (item: C) => Promise<number>;
  onDelete?: (item: T) => Promise<number>;
  refreshData?: () => void;
}) => {
  const [showOverLay, setShowOverLay] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const inputs = Object.keys(inputValues?.inputs || {});
  const initialState = Object.fromEntries(inputs.map((key) => [key, ""])) as C;
  const [formData, setFormData] = useState<C>(initialState);
  useEffect(() => console.log(formData, "Pranayam"), []);
  const filteredData = data.filter((item) => {
    const search = searchValue.toLowerCase().trim();
    const searchMatch =
      !search ||
      String(item[searchColoumn]).toLowerCase().includes(search) ||
      String(item[searchColoumn2]).includes(search);

    const allFiltersMatch = filters.every((filter) => {
      const selected = filter.filterSelected;
      const defaultValue = filter.filterValue[0];
      const column = filter.filterColoumnName as keyof T;

      return (
        selected === defaultValue ||
        (item[column] as string[])?.includes(selected)
      );
    });

    return searchMatch && allFiltersMatch;
  });

  const handleDelete = async () => {
    if (!onDelete || !selectedItem) return;

    const res: number = await onDelete(selectedItem);
    if (res === 200) {
      setShowOverLay(false);
      refreshData?.();
      setSelectedItem(null);
    }
  };

  if (filteredData.length === 0) {
    return <div className="text-center py-10 text-gray-500">No data found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 mt-10">
        {filteredData.map((item, i) => (
          <Card
            key={i}
            data={item}
            onDeleteClick={() => {
              setSelectedItem(item);
              setShowOverLay(true);
            }}
          />
        ))}
        <button
          onClick={() => setShowOverLay(true)}
          className="fixed bottom-10 bg-white right-10 border-gray-300 border-1  text-green-600 z-100 p-4 rounded-full shadow-lg hover:bg-green-700 hover:text-white hover:border-green-700 transition"
        >
          <Plus />
        </button>
      </div>

      {showOverLay && (
        <>
          {selectedItem ? (
            <div className="flex w-screen h-screen fixed top-0 z-100 items-center justify-center">
              <div className="absolute max-w-md border-0 rounded-2xl shadow min-h-42 h-auto w-full bg-white flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col"
                >
                  <div className="bg-white pt-6 pl-6 pb-2 border-b border-gray-100">
                    <button
                      onClick={() => {
                        setShowOverLay(false);
                      }}
                      className="absolute top-3 right-3"
                    >
                      <X />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="px-1 bg-blue-100 rounded-lg">
                        <Trash2 className="text-red-600" size={20} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Delete
                      </h3>
                    </div>
                  </div>

                  <div className="px-8 pb-2">
                    <p className="text-sm text-gray-800">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold">
                        {String(selectedItem[searchColoumn])}
                      </span>
                      ?
                    </p>
                  </div>

                  <div className="px-6 flex justify-between pb-6 gap-4">
                    <button
                      onClick={() => {
                        setShowOverLay(false);
                        setSelectedItem(null);
                      }}
                      className="min-w-1/3 px-3 w-auto py-3 bg-gray-400/60 border-gray-500 text-gray-900/70  border-1 focus:outline-none hover:bg-gray-500 hover:text-white  font-medium rounded-xl transition-all shadow-lg active:scale-[0.98]"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDelete}
                      className="min-w-1/3 w-auto px-3 py-3 bg-red-300 text-red-500 border-red-600 border-1 focus:outline-none hover:bg-red-700 hover:text-white font-medium rounded-xl transition-all shadow-lg active:scale-[0.98]"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </div>
              <div
                onClick={() => {
                  setShowOverLay(false);
                  setSelectedItem(null);
                }}
                className="h-full w-full bg-black/60"
              />
            </div>
          ) : (
            <div>
              {inputValues && refreshData && onAdd && (
                <div className="fixed w-full h-screen top-0 z-100 flex items-center justify-center">
                  <div
                    className="fixed inset-0 top-0 z-0 bg-black/60"
                    onClick={() => {
                      setShowOverLay(!showOverLay);
                      setFormData(initialState);
                    }}
                  />
                  <Form<C>
                    activity={newCreationForms[newData as newCreationType]}
                    formData={formData}
                    onAdd={onAdd}
                    refreshData={refreshData}
                    setFormData={setFormData}
                    setShowOverLay={setShowOverLay}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
