import axios from "axios";
const editCrop = async (id: number, formData: any) => {
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/editCrop",
    { cropId: id, cropActivity: formData },
  );
  if (res.status === 200) {
    return "ok";
  }
};

const addNewColoumn = async (id: number, formData: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/newCropActivity",
    { cropId: id, cropActivity: formData },
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
const editNewColoumn = async (id: number, formData: any) => {
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/editCropActivity",
    { cropId: id, cropActivity: formData },
  );
  if (res.status === 200) {
    return "ok";
  }
};

const addSubActivity = async (id: number, formData: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/addSubActivity",
    { sid: id, subactivity: formData },
  );
  if (res.status === 200) {
    return "ok";
  }
};
const editSubActivity = async (id: number, formData: any) => {
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/editSubActivity",
    { cropId: id, cropActivity: formData },
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
const addSubActivityColoumn = async (id: number, formData: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/addSubActivityColoumn",
    { sid: id, subactivity: formData },
  );
  if (res.status === 200) {
    return "ok";
  }
};

const editSubActivityColoumn = async (id: number, formData: any) => {
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/editSubActivityColoumn",
    { sid: id, subactivity: formData },
  );
  if (res.status === 200) {
    return "ok";
  }
};
const deleteSubActivityColoumn = async (id: number) => {
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/deleteSubActivityColoumn/" + id,
  );
  if (res.status === 200) {
    return "ok";
  }
};

export type FormActivityType =
  | "Update Crop Details"
  | "Add new Activity"
  | "Add new sub Activity"
  | "Add new sub Activity Coloumn"
  | "Update Activity"
  | "Update Sub-Activity"
  | "Update Sub-Activity-Coloumn";
export interface FormInput {
  sub: string;
  name: string;
  icons?: React.ReactNode;
  type: "text" | "number" | "dropDown" | "url" | "color";
  types?: string[];
  placeholder: string;
}

export interface ActivityConfig {
  heading: string;
  inputs: FormInput[];
  func?: (id: number, formData: any) => Promise<"ok" | undefined>;
}
export const cropForms: Record<FormActivityType, ActivityConfig> = {
  "Update Crop Details": {
    heading: "Edit Crop Details",
    inputs: [
      {
        sub: "Crop Name",
        name: "cropName",
        type: "text",
        placeholder: "Enter Crop Name",
      },
      {
        sub: "Crop Image",

        name: "cropPic",
        type: "url",
        placeholder: "Enter Crop Image",
      },
      {
        sub: "Crop Color",
        name: "cropColor",
        type: "color",
        placeholder: "Enter Crop Color",
      },
    ],
    func: async (id: number, formData: any) => await editCrop(id, formData),
  },
  "Add new Activity": {
    heading: "Add Log Activity",

    inputs: [
      {
        sub: "Record progress or updates for this specific stage for",

        name: "name",
        type: "text",
        placeholder: "Describe The Activity",
      },
      {
        sub: "Record duration of ",
        name: "duration",

        type: "number",
        placeholder: "Enter The Number Of Days",
      },
    ],
    func: async (id: number, formData: any) =>
      await addNewColoumn(id, formData),
  },
  "Add new sub Activity": {
    heading: "Add Sub Activity",
    inputs: [
      {
        sub: "Record new Sub Activities for",
        name: "name",
        type: "text",
        placeholder: "Describe The Sub-Activity",
      },
    ],
    func: async (id: number, formData: any) =>
      await addSubActivity(id, formData),
  },
  "Add new sub Activity Coloumn": {
    heading: "Add Sub Activity Coloumn",
    inputs: [
      {
        sub: "Record new Sub Activities Coloumns for",

        name: "name",
        type: "text",
        placeholder: "Describe The Sub-Activity Coloumn",
      },
      {
        sub: "Enter Data Type",
        name: "type",

        type: "dropDown",
        types: ["String", "Number", "Boolean", "Date"],
        placeholder: "Enter Type",
      },
    ],
    func: async (id: number, formData: any) =>
      await addSubActivityColoumn(id, formData),
  },
  "Update Activity": {
    heading: "Edit Activity",

    inputs: [
      {
        sub: "Record progress or updates for this specific stage for",

        name: "name",
        type: "text",
        placeholder: "Describe The Activity",
      },
      {
        sub: "Record duration of ",
        name: "duration",
        type: "number",

        placeholder: "Enter The Number Of Days",
      },
    ],
    func: async (id: number, formData: any) =>
      await editNewColoumn(id, formData),
  },
  "Update Sub-Activity": {
    heading: "Edit Sub Activity",
    inputs: [
      {
        sub: "Record new Sub Activities for",
        name: "name",

        type: "text",
        placeholder: "Describe The Sub-Activity",
      },
    ],
    func: async (id: number, formData: any) =>
      await editSubActivity(id, formData),
  },
  "Update Sub-Activity-Coloumn": {
    heading: "Update Sub Activity Coloumn",
    inputs: [
      {
        sub: "Record new Sub Activities Coloumns for",
        name: "name",
        type: "text",
        placeholder: "Describe The Sub-Activity Coloumn",
      },
      {
        sub: "Enter Data Type",
        name: "type",
        type: "dropDown",
        types: ["String", "Number", "Boolean", "Date"],
        placeholder: "Enter Type",
      },
    ],
    func: async (id: number, formData: any) =>
      await editSubActivityColoumn(id, formData),
  },
};
export const deleteValues = {
  "delete activity": {
    heading: "Delete Activity",
    sub: "Are You Sure You Want To Delete Activity ",
    func: async (id: number) => await deleteColoumn(id),
  },
  "delete sub Activity": {
    heading: "Delete Sub Activity",
    sub: "Are You Sure You Want To Delete Sub Activity ",
    func: async (id: number) => await deleteSubActivity(id),
  },
  "delete sub Activity coloumn": {
    heading: "Delete Sub Activity Coloumn",
    sub: "Are You Sure You Want To Delete Sub Activity Coloumn ",
    func: async (id: number) => await deleteSubActivityColoumn(id),
  },
};
