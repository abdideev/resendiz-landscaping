import type { GalleryImage } from "@/types/gallery";

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    id: "project-1",
    src: "/images/project-1.webp",
    alt: "Completed lawn restoration in Leesburg",
    caption: "Lawn Restoration — Leesburg",
  },
  {
    id: "project-2",
    src: "/images/project-2.webp",
    alt: "Custom mulch beds in Purcellville",
    caption: "Mulch Installation — Purcellville",
  },
  {
    id: "project-3",
    src: "/images/project-3.webp",
    alt: "Stone walkway in Waterford",
    caption: "Stone Walkway — Waterford",
  },
  {
    id: "project-4",
    src: "/images/project-4.webp",
    alt: "Seasonal cleanup in Hamilton",
    caption: "Seasonal Cleanup — Hamilton",
  },
  {
    id: "project-5",
    src: "/images/project-5.webp",
    alt: "Planting design in Lovettsville",
    caption: "Planting Design — Lovettsville",
  },
];

export const GALLERY_VISIBLE_COUNT = 3;
