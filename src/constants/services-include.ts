import type { ServiceItem } from "@/types/services";

export const SERVICES_INCLUDE: readonly ServiceItem[] = [
  {
    id: "premium-mulching",
    name: "Premium Mulching",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/mulch-installation-taylorstown/mulch-installation-process-05.webp",
    imageAlt: "Fresh premium mulch applied around garden beds",
  },
  {
    id: "expert-planting",
    name: "Expert Planting",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/mulch-installation-taylorstown/mulch-installation-taylorstown-before.webp",
    imageAlt: "Newly planted shrubs and ornamental plants",
  },
  {
    id: "lawn-maintenance",
    name: "Lawn Maintenance",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/spring-cleanup-premium-black-mulch-installation-hamilton-va/spring-cleanup-premium-black-mulch-installation-hamilton-va-05.webp",
    imageAlt: "Manicured lawn with crisp edges",
  },
  {
    id: "seasonal-cleanup",
    name: "Seasonal Cleanup",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/snow-damage-tree-removal-cleanup-waterford-ridge/snow-damage-tree-removal-cleanup-waterford-ridge-06.webp",
    imageAlt: "Yard cleared of fallen leaves and debris",
  },
  {
    id: "core-aeration",
    name: "Core Aeration",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/sod-installation-round-hill-va/sod-installation-round-hill-va-05.webp",
    imageAlt: "Core aeration treatment on a healthy lawn",
  },
  {
    id: "design",
    name: "Design",
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/landscape-renovation-round-hill/landscape-renovation-after.webp",
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
    image:
      "https://vsvwckoszrikdlnbixdi.supabase.co/storage/v1/object/public/portfolio/decorative-gravel-purcellville/decorative-gravel-purcellville-main.webp",
    imageAlt: "Decorative gravel pathway in a garden setting",
  },
] as const;
