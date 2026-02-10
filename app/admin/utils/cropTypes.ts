export type CropStats = {
  totalFarmers: number;
  totalPlots: number;
  totalArea: number;
};

export type CropGridType = {
  cropId: number;
  cropName: string;
  cropImage: string;
  season: string;
  stats: CropStats;
};

export type CropHeroType = {
  cropName: string;
  description: string;
  idealTemperature: string;
  waterRequirement: string;
  soilType: string;
};
