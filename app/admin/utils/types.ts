import { LatLngTuple } from "leaflet";

export interface plotType {
  agentId: number;
  plotId: number;
  farmerId: number;
  crop: string;
  location: string;
  plot: LatLngTuple[];
  plotImage: string;
}

export interface farmerType {
  agentId: number;
  farmerId: number;
  name: string;
  noOfPlots: number;
  farmerImage: string;
  phone?: string;
}

export interface AgentType {
  agentId: number;
  agentPic: string;
  agentName: string;
  agentMail: string;
  agentPass: string;
}
export interface selectedPlot extends plotType, farmerType {}

export interface PlotDets extends plotType {
  fid: farmerType;
}

export interface FullFarmerDetails extends farmerType {
  crops: string[];
  locations: string[];
}

export interface CropStats {
  totalFarmers: number;
  totalPlots: number;
  totalArea: number;
}

export interface CropGridType {
  cropId: number;
  cropName: string;
  cropImage: string;
  cropDesc?: string;
  stats: {
    totalFarmers: number;
    totalPlots: number;
  };
}

export interface IndivitualCrop extends CropGridType {
  plots: {
    pid: {
      plotCords: LatLngTuple[];
      location: string;
      plotImage: string;
      plotId: number;
      fid: {
        farmerId: number;
        farmerName: string;
        farmerPic: string;
        agentId: number;
      };
    };
  }[];
}
