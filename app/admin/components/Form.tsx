import { motion } from "framer-motion";
import { selectedColoumn } from "../crops/[id]/components/cropMainData";
import { PlusCircle } from "lucide-react";
import { ActivityConfig, FormInput } from "../crops/[id]/utils/cropActions";
import { useEffect } from "react";

export const Form = <T extends { [key: string]: any }>({
  selectedColoumn,
  refreshData,
  setShowOverLay,
  activity,
  formData,
  setFormData,
  onAdd,
}: {
  selectedColoumn?: selectedColoumn;
  refreshData: () => void;
  activity: ActivityConfig;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setShowOverLay: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd?: (item: T) => Promise<number>;
}) => {
  useEffect(() => console.log(formData), [formData]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (activity.func) {
          const data = await activity.func(selectedColoumn?.id || 0, formData);
          if (data === "ok") {
            setShowOverLay(false);
            refreshData();
          }
        } else {
          if (onAdd) await onAdd(formData);
        }
        setShowOverLay(false);
        setFormData({});
        refreshData();
      }}
      className="absolute min-w-md border-0  rounded-2xl shadow min-h-58 z-110 h-auto w-auto bg-white flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col"
      >
        <div className="bg-gray-50/50 p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="px-2 bg-blue-100 text-blue-600 rounded-lg">
              <PlusCircle size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
              {activity?.heading}
            </h3>
          </div>
        </div>

        <div
          className={`px-6 pb-2 ${
            activity?.inputs?.length > 4
              ? "grid grid-cols-3 gap-x-10"
              : "flex flex-col"
          }`}
        >
          {activity?.inputs.map((input: FormInput, i: number) => (
            <div key={i} className="mt-2">
              <p className="text-sm pb-1 text-gray-500">
                {input.sub +
                  " " +
                  (selectedColoumn?.name ? selectedColoumn.name : "")}
              </p>
              <div className="relative group">
                {input.type === "dropDown" ? (
                  <select
                    required
                    value={formData[input.name] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [input.name]: e.target.value,
                      })
                    }
                    className="w-full pl-4 pr-12 py-3  bg-gray-50 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="" disabled hidden>
                      Select - {input.name}
                    </option>

                    {input.types &&
                      input.types.map((t: any) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    value={formData[input.name] || ""}
                    type={input.type}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [input.name]: e.target.value,
                      })
                    }
                    placeholder={input.placeholder}
                    className={`w-full ${input.type == "color" ? "h-8 rounded-2xl b" : "pl-4 pr-12 py-3 bg-gray-50 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            Save Activity
          </button>
        </div>
      </motion.div>
    </form>
  );
};
