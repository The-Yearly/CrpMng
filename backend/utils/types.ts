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
  farmerName: string;
  noOfPlots: number;
  farmerPic: string;
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

export interface fullFarmerDetails extends farmerType {
  farmerFather?: string;
  address?: string;
  country?: string;
  district?: string;
  tehsil?: string;
  village?: string;
  season?: string;
  state?: string;
  farmCode?: number;
  aadharNumber?: string;
  farmerAge?: number;
  migrantStatus?: string;
  landHoldingType?: string;
  farmerAssociation?: string;
  gender?: string;
  crops: Record<string, string>;
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
  cropColor: string;
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
  stages: Stages[];
}

export interface Stages {
  sid: number;
  stagename: string;
  duration: number;
  stagenumber: number;
  cropsubstages: {
    substageid: number;
    substagename: string;
    substagescoloumns: {
      substagedataid: number;
      substagecolomn: string;
      substagecoloumnvalue: string;
    }[];
  }[];
}

export interface fullPlotDetails extends plotType {
  cropData: {
    cropStages: {
      stagename: string;
      cropsubstages: {
        substagename: string;
        cropsubstagesvalues: {
          plotsubstagevalues: {
            name: string;
            data: string;
          }[];
        }[];
      }[];
    }[];
  }[];
}
