import { CropOptions } from "./CropModal";

// Crop presets for different use cases
export const CROP_PRESETS = {
  // Square presets
  SQUARE: {
    aspectRatio: 1,
    minWidth: 200,
    minHeight: 200,
    maxWidth: 2000,
    maxHeight: 2000
  },
  
  // Logo presets
  LOGO: {
    aspectRatio: 1,
    minWidth: 200,
    minHeight: 200,
    maxWidth: 1000,
    maxHeight: 1000
  },
  
  // Profile picture
  PROFILE: {
    aspectRatio: 1,
    minWidth: 300,
    minHeight: 300,
    maxWidth: 1500,
    maxHeight: 1500
  },
  
  // Hero image (16:9)
  HERO: {
    aspectRatio: 16/9,
    minWidth: 800,
    minHeight: 450,
    maxWidth: 2400,
    maxHeight: 1350
  },
  
  // Banner (3:1)
  BANNER: {
    aspectRatio: 3/1,
    minWidth: 900,
    minHeight: 300,
    maxWidth: 2400,
    maxHeight: 800
  },
  
  // Card image (4:3)
  CARD: {
    aspectRatio: 4/3,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 1600,
    maxHeight: 1200
  },
  
  // Blog thumbnail (16:9)
  BLOG_THUMBNAIL: {
    aspectRatio: 16/9,
    minWidth: 400,
    minHeight: 225,
    maxWidth: 1200,
    maxHeight: 675
  },
  
  // Free form (no aspect ratio constraint)
  FREE: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 2000,
    maxHeight: 2000
  }
} as const;

export type CropPresetType = keyof typeof CROP_PRESETS;

// Helper function to get crop options by preset
export function getCropOptions(preset: CropPresetType): CropOptions {
  return CROP_PRESETS[preset];
}

// Helper function to get crop options with custom aspect ratio
export function getCustomCropOptions(aspectRatio: number, minSize = 200): CropOptions {
  return {
    aspectRatio,
    minWidth: minSize,
    minHeight: minSize,
    maxWidth: 2000,
    maxHeight: 2000
  };
} 