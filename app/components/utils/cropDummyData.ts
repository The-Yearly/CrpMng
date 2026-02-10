import { CropGridType, CropHeroType } from "./../../admin/utils/cropTypes";
/* ================= CROP GRID DATA ================= */

export const CropGridData: CropGridType[] = [
  {
    cropId: 1,
    cropName: "CHILLI",
    cropImage: "/crops/chilli.jpg",
    season: "Kharif",
    stats: {
      totalFarmers: 48,
      totalPlots: 112,
      totalArea: 320,
    },
  },
  {
    cropId: 2,
    cropName: "TURMERIC",
    cropImage: "/crops/turmeric.jpg",
    season: "Kharif",
    stats: {
      totalFarmers: 35,
      totalPlots: 90,
      totalArea: 275,
    },
  },
  {
    cropId: 3,
    cropName: "GINGER",
    cropImage: "/crops/ginger.jpg",
    season: "Kharif",
    stats: {
      totalFarmers: 22,
      totalPlots: 61,
      totalArea: 180,
    },
  },
  {
    cropId: 4,
    cropName: "MARIGOLD",
    cropImage: "/crops/marigold.jpg",
    season: "Rabi",
    stats: {
      totalFarmers: 18,
      totalPlots: 40,
      totalArea: 95,
    },
  },
];

/* ================= CROP HERO DATA ================= */

export const CropHeroData: CropHeroType[] = [
  {
    cropName: "CHILLI",
    description:
      "Chilli is a major commercial spice crop grown for its pungent fruits used in culinary and industrial applications.",
    idealTemperature: "20°C – 30°C",
    waterRequirement: "Moderate",
    soilType: "Well-drained loamy soil",
  },
  {
    cropName: "TURMERIC",
    description:
      "Turmeric is a rhizomatous herbaceous perennial plant widely used for culinary, medicinal, and cosmetic purposes.",
    idealTemperature: "20°C – 35°C",
    waterRequirement: "Moderate to High",
    soilType: "Sandy loam to clay loam",
  },
  {
    cropName: "GINGER",
    description:
      "Ginger is a flowering plant whose rhizome is widely used as a spice and traditional medicine.",
    idealTemperature: "22°C – 28°C",
    waterRequirement: "High",
    soilType: "Rich loamy soil",
  },
  {
    cropName: "MARIGOLD",
    description:
      "Marigold is a popular ornamental flower crop cultivated for garlands, decorations, and essential oils.",
    idealTemperature: "18°C – 26°C",
    waterRequirement: "Low to Moderate",
    soilType: "Well-drained fertile soil",
  },
];
