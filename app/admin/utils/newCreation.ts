import { types } from "util"

export type newCreationType = 
  | "Add New Farmer"
  | "Add New Crop"

export const newCreationForms={
      "Add New Farmer": {
    heading: "Add New Farmer",
    inputs: [
  {
    sub: "Farmer Name",
    name: "farmerName",
    type: "text",
    placeholder: "Enter Farmer Name",
  },
    {
    sub: "Farmer Image",
    name: "farmerImage",
    type: "url",
    placeholder: "Enter Farmer Image",
  },
    {
    sub: "Farmer Father",
    name: "farmerFather",
    type: "text",
    placeholder: "Enter Farmer Father Name",
  },
  {
    sub: "Farmer Age",
    name: "farmerAge",
    type: "number",
    placeholder: "Enter Farmer Age",
  },
  {
    sub: "Gender",
    name: "gender",
    type: "dropDown",
    types: ["Male", "Female"],
    placeholder: "Enter Select Gender",
  },
  {
    sub: "Mobile",
    name: "phone",
    type: "text",
    placeholder: "Enter Phone Number",
  },
  {
    sub: "Farmer Code",
    name: "farmCode",
    type: "number",
    placeholder: "Enter Farm Code",
  },
  {
    sub: "Country",
    name: "country",
    type: "text",
    placeholder: "Enter Country Name",
  },
  {
    sub: "District",
    name: "district",
    type: "text",
    placeholder: "Enter District",
  },
  {
    sub: "Tehsil/Mandal",
    name: "tehsil",
    type: "dropDown",
    types:["Tehsil","Mandal"],
    placeholder:"Tehsil/Mandal"
  },
  {
    sub: "Village",
    name: "village",
    type: "text",
    placeholder: "Enter Village Name",
  },
  {
    sub: "Season",
    name: "season",
    type: "text",
    placeholder: "Enter Season",
  },
  {
    sub: "Aadhar Number",
    name: "aadharNumber",
    type: "text",
    placeholder: "Enter Aadhar Number",
  },
    {
    sub: "Farmer Address",
    name: "address",
    type: "string",
    placeholder: "Enter Address",
  },
  {
    sub: "Migrant or Local",
    name: "migrantStatus",
    type: "dropDown",
    types: ["Migrant", "Local"],
    placeholder: "Select Status",
  },
  {
    sub: "Land Holding Area - Own/Lease",
    name: "landHoldingType",
    type: "dropDown",
    types: ["Own", "Lease"],
    placeholder: "Select Land Holding Type",
  },
  {
    sub: "Farmer Association",
    name: "farmerAssociation",
    type: "text",
    placeholder: "Enter Farmer Association Name",
  },
]
  },
     "Add New Crop": {
    heading: "Add New Crop",
    inputs: [
      {
        sub: "New Crop Name",
        name: "cropName",
        type: "text",
        placeholder: "Crop Name",
      },
      {
        sub: "Crop Image",
        name: "cropImage",
        type: "url",
        placeholder: "Enter Crop Image",
      },
    ],
  }
}