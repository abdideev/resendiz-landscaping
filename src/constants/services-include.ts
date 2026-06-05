import type { ServiceItem } from "@/types/services";

export const SERVICES_INCLUDE: readonly ServiceItem[] = [
  {
    id: "premium-mulching",
    name: "Premium Mulching",
    image: "/images/mulching.webp",
    imageAlt: "Fresh premium mulch applied around garden beds",
  },
  {
    id: "expert-planting",
    name: "Expert Planting",
    image: "/images/planting.webp",
    imageAlt: "Newly planted shrubs and ornamental plants",
  },
  {
    id: "lawn-maintenance",
    name: "Lawn Maintenance",
    image: "/images/lawn-maintenance.webp",
    imageAlt: "Manicured lawn with crisp edges",
  },
  {
    id: "seasonal-cleanup",
    name: "Seasonal Cleanup",
    image: "/images/seasonal-cleanup.webp",
    imageAlt: "Yard cleared of fallen leaves and debris",
  },
  {
    id: "core-aeration",
    name: "Core Aeration",
    image: "/images/aeration.webp",
    imageAlt: "Core aeration treatment on a healthy lawn",
  },
  {
    id: "design",
    name: "Design",
    image: "/images/design.webp",
    imageAlt: "Custom landscape design with pergola and seating area",
  },
  {
    id: "stone-wall",
    name: "Stone wall",
    image: "/images/stone-wall.webp",
    imageAlt: "Stacked natural stone retaining wall",
  },
  {
    id: "decorative-gravel",
    name: "Decorative gravel",
    image: "/images/decorative-gravel.webp",
    imageAlt: "Decorative gravel pathway in a garden setting",
  },
] as const;
