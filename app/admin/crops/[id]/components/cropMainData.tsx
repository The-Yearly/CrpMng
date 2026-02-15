import { IndivitualCrop } from "@/app/admin/utils/types";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Send,
  Pencil,
  PlusCircle,
  Trash2,
  Plus,
} from "lucide-react";
import { useState } from "react";

const addNewColoumn = async (id: number, coloumnName: string) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/newCropActivity",
    { cropId: id, cropActivity: coloumnName },
  );
  if (res.status === 200) {
    return "ok";
  }
};
const deleteColoumn = async (id: number) => {
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/deleteCropActivity/" + id,
  );
  if (res.status === 200) {
    return "ok";
  }
};
const addSubColoumn = async (id: number, coloumnName: string) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/addSubActivity",
    { sid: id, subactivityname: coloumnName },
  );
  if (res.status === 200) {
    return "ok";
  }
};
const deleteSubActivity = async (id: number) => {
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/deleteSubActivity/" + id,
  );
  if (res.status === 200) {
    return "ok";
  }
};
interface selectedColoumn {
  id: number;
  name: string;
}
const formvalues = {
  "Add new Activity": {
    heading: "Add Log Activity",
    sub: "Record progress or updates for this specific stage for",
    func: async (id: number, coloumnName: string) =>
      await addNewColoumn(id, coloumnName),
  },
  "Add new sub Activity": {
    heading: "Add Sub Activity",
    sub: "Record new Sub Activities for",
    func: async (id: number, coloumnName: string) =>
      await addSubColoumn(id, coloumnName),
  },
};
const deleteValues = {
  "delete activity": {
    heading: "Delete Activity",
    sub: "Are You Sure You Want To Delete Activity ",
    func: async (id: number) => await deleteColoumn(id),
  },
  "delete sub Activity": {
    heading: "Delete Sub Activity",
    sub: "Are You Sure You Want To Delete Sub Activity: ",
    func: async (id: number) => await deleteSubActivity(id),
  },
};

const Form = ({
  selectedColoumn,
  refreshData,
  setShowOverLay,
  activity,
}: {
  selectedColoumn: selectedColoumn;
  refreshData: () => void;
  activity: string;
  setShowOverLay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [coloumnName, setColoumnName] = useState("");
  return (
    <div className="absolute max-w-md border-0 rounded-2xl shadow max-h-58 z-110 h-full w-full bg-white flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col"
      >
        <div className="bg-gray-50/50 p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="px-2 bg-blue-100 text-blue-600 rounded-lg">
              <PlusCircle size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
              {formvalues[activity as keyof typeof formvalues]?.heading}
            </h3>
          </div>
        </div>

        <div className="px-6 pb-2 ">
          <p className="text-sm pb-1 text-gray-500">
            {formvalues[activity as keyof typeof formvalues]?.sub +
              " " +
              selectedColoumn.name}
          </p>

          <div className="relative group">
            <input
              value={coloumnName}
              onChange={(e) => {
                setColoumnName(e.target.value);
              }}
              placeholder="Describe the activity..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border-1  border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />

            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={async () => {
              const data: string =
                (await formvalues[activity as keyof typeof formvalues].func(
                  selectedColoumn.id,
                  coloumnName,
                )) ?? "";
              if (data === "ok") {
                setShowOverLay(false);
                refreshData();
              }
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            Save Activity
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export const CropMainData = ({
  crop,
  refreshData,
}: {
  crop: IndivitualCrop;
  refreshData: () => void;
}) => {
  const [trackOpens, setTrackOpens] = useState<number[]>([]);
  const [trackSubStageOpen, setTrackSubStageOpen] = useState<number[]>([]);
  const [showOverLay, setShowOverLay] = useState(false);
  const [activity, setActivity] = useState("");
  const [selectedColoumn, setSelectedColoumn] = useState<selectedColoumn>({
    id: 0,
    name: "",
  });

  const formActivities = Object.keys(formvalues);
  const deleteActivities = Object.keys(deleteValues);
  console.log(deleteActivities)
  return (
    <div className="col-span-2 flex-col mt-8">
      {showOverLay && (
        <div className="fixed flex items-center justify-center top-0 right-0">
          {formActivities.includes(activity) && (
            <Form
              selectedColoumn={selectedColoumn}
              refreshData={refreshData}
              setShowOverLay={setShowOverLay}
              activity={activity}
            />
          )}
          {deleteActivities.includes(activity) && (
            <div className="absolute max-w-md border-0 rounded-2xl shadow min-h-42 z-110 h-auto w-full bg-white flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col"
              >
                <div className="bg-gray-50/50 pt-6 pl-6 pb-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="px-1 bg-blue-100 rounded-lg">
                      <Trash2 className="text-red-600" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                      {
                        deleteValues[activity as keyof typeof deleteValues]
                          .heading
                      }
                    </h3>
                  </div>
                </div>

                <div className="px-8 pb-2 ">
                  <p className="text-sm pb-1 text-gray-800">
                    {deleteValues[activity as keyof typeof deleteValues].sub +
                      " " +
                      selectedColoumn.name}
                  </p>
                </div>
                <div className="px-6 flex justify-between pb-6">
                  <button
                    onClick={() => {
                      setShowOverLay(false);
                    }}
                    className="min-w-1/3 px-3 w-auto py-3 bg-gray-300 border-gray-400 border-1 focus:outline-none hover:bg-gray-500 hover:text-white  font-medium rounded-xl transition-all shadow-lg active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const data: string =
                        (await deleteValues[
                          activity as keyof typeof deleteValues
                        ].func(selectedColoumn.id)) ?? "";
                      console.log(data);
                      if (data == "ok") {
                        console.log("HI");
                        setShowOverLay(false);
                        refreshData();
                      }
                    }}
                    className="min-w-1/3 w-auto px-3 py-3 bg-red-400 border-red-700 border-1 focus:outline-none hover:bg-red-700 text-white font-medium rounded-xl transition-all shadow-lg active:scale-[0.98]"
                  >
                       {
                        deleteValues[activity as keyof typeof deleteValues]
                          .heading
                      }
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          <div
            onClick={() => {
              setShowOverLay(false);
            }}
            className=" z-100 w-screen h-screen bg-black/50 "
          />
        </div>
      )}
      <div className="flex w-full justify-between">
        <div className="flex ml-18  space-y-1 flex-col">
          <p className="text-5xl text-gray-800">Crop Insights</p>
          <p className="text-2xl ml-1 text-gray-800/40">
            Detailed health metrics and operational history
          </p>
        </div>
        <div className="flex gap-4 mr-12">
          <button className="bg-white/80 border-gray-900/20 text-gray-700 border-1 flex items-center gap-2 rounded-lg h-12 px-5 text-xl ">
            <Pencil />
            Edit Crop
          </button>
          <button
            onClick={() => {
              setShowOverLay(true);
              setSelectedColoumn({ id: crop.cropId, name: crop.cropName });
              setActivity("Add new Activity");
            }}
            className="bg-[#2bed2b] flex items-center gap-2 rounded-lg h-12 px-5 text-xl "
          >
            <PlusCircle />
            Log Activity
          </button>
        </div>
      </div>
      <div className="ml-18 mt-12 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Stages</h2>

        <div className="space-y-3">
          {crop.stages.length !== 0 ? (
            crop.stages.map((stage, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center gap-8 flex-1">
                    <p className="font-bold text-gray-700 min-w-[150px]">
                      {stage.stagename}
                    </p>
                    <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Duration:
                      <span className="font-medium text-gray-700">
                        {stage.duration} days
                      </span>
                    </p>
                    <div className="space-x-3">
                      <button
                        onClick={() => {
                          setShowOverLay(true);
                          setActivity("delete activity");
                          setSelectedColoumn({
                            id: stage.sid,
                            name: stage.stagename,
                          });
                        }}
                      >
                        <Trash2 className="text-red-400 hover:text-red-700 transition-colors w-6 h-6" />
                      </button>
                      <button>
                        <Pencil className="w-6 h-6" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => {
                          setShowOverLay(true);
                          setActivity("Add new sub Activity");
                          setSelectedColoumn({
                            id: stage.sid,
                            name: stage.stagename,
                          });
                        }}
                      >
                        <Plus className="w-6 h-6" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() =>
                          trackOpens.includes(i)
                            ? setTrackOpens(
                                trackOpens.filter((index) => index != i),
                              )
                            : setTrackOpens([...trackOpens, i])
                        }
                        className={` rounded-full transition-all duration-300 ${trackOpens.includes(i) ? "bg-green-100 text-green-600" : "hover:bg-gray-100"}`}
                      >
                        <motion.div
                          animate={{ rotate: trackOpens.includes(i) ? 180 : 0 }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {trackOpens.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-gray-50 border-t border-gray-100"
                    >
                      <div className="p-4 space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Substages
                        </p>
                        {stage.cropsubstages.map((substage, subIdx) => (
                          <div key={subIdx}>
                            <motion.div
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: subIdx * 0.05 }}
                              className="flex items-center gap-3 text-gray-600 bg-white p-2 rounded border border-gray-200 shadow-sm"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <div className="flex justify-between items-center gap-8 flex-1">
                                <p className="font-bold text-gray-700 min-w-[150px]">
                                  {substage.substagename}
                                </p>
                                <div className="space-x-2">
                                  <button
                                    onClick={() => {
                                      setShowOverLay(true);
                                      setActivity("delete sub Activity");
                                      setSelectedColoumn({
                                        id: substage.substageid,
                                        name: substage.substagename,
                                      });
                                    }}
                                  >
                                    <Trash2 className="text-red-400 hover:text-red-700 transition-colors w-6 h-6" />
                                  </button>
                                  <button>
                                    <Pencil
                                      className="w-6 h-6"
                                      strokeWidth={1.5}
                                    />
                                  </button>

                                  <button
                                    onClick={() =>
                                      trackSubStageOpen.includes(
                                        substage.substageid,
                                      )
                                        ? setTrackSubStageOpen(
                                            trackSubStageOpen.filter(
                                              (index) =>
                                                index != substage.substageid,
                                            ),
                                          )
                                        : setTrackSubStageOpen([
                                            ...trackSubStageOpen,
                                            substage.substageid,
                                          ])
                                    }
                                    className={`p-2 rounded-full transition-all duration-300 ${trackSubStageOpen.includes(substage.substageid) ? "bg-green-100 text-green-600" : "hover:bg-gray-100"}`}
                                  >
                                    <motion.div
                                      animate={{
                                        rotate: trackSubStageOpen.includes(
                                          substage.substageid,
                                        )
                                          ? 180
                                          : 0,
                                      }}
                                    >
                                      <ChevronDown size={20} />
                                    </motion.div>
                                  </button>
                                </div>
                                <AnimatePresence></AnimatePresence>
                              </div>
                            </motion.div>
                            {trackSubStageOpen.includes(
                              substage.substageid,
                            ) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="bg-gray-50 border-t border-gray-100"
                              >
                                <div className="p-4 space-y-2">
                                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Coloumns
                                  </p>
                                  {substage.substagescoloumns.map(
                                    (coloumn, coloumnIdx) => (
                                      <div key={coloumnIdx}>
                                        <motion.div
                                          initial={{ x: -10, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{
                                            delay: coloumnIdx * 0.05,
                                          }}
                                          className="flex items-center gap-3 text-gray-600 bg-white p-2 rounded border border-gray-200 shadow-sm"
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                          <div className="flex justify-between items-center gap-8 flex-1">
                                            <p className="font-bold text-gray-700 min-w-[150px]">
                                              {coloumn.substagecolomn}
                                            </p>
                                            <div>
                                              <button>
                                                <Trash2 className="text-red-400 hover:text-red-700 transition-colors w-6 h-6" />
                                              </button>
                                            </div>
                                          </div>
                                        </motion.div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No Stages available</p>
          )}
        </div>
      </div>
    </div>
  );
};
