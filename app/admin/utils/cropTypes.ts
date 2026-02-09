export type CropName =
  | "CHILLI"
  | "TURMERIC"
  | "GINGER"
  | "MARIGOLD";

export type CropStats = {
  totalFarmers: number;
  totalPlots: number;
  totalArea: number; // in acres
};

export type CropGridType = {
  cropId: number;
  cropName: CropName;
  cropImage: string;
  season: string;
  stats: CropStats;
};

export type CropHeroType = {
  cropName: CropName;
  description: string;
  idealTemperature: string;
  waterRequirement: string;
  soilType: string;
};
