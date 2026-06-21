import type { EstimatePropertySize, EstimateService } from "@/types/estimate";
import type { EstimateServiceArea } from "@/types/estimate";

export const ESTIMATE_SERVICES: readonly EstimateService[] = [
  { id: "mulch", name: "Mulch" },
  { id: "lawn-maintenance", name: "Lawn Maintenance" },
  { id: "spring-fall-cleanup", name: "Spring/Fall Cleanup" },
  { id: "planting", name: "Planting" },
  { id: "edging", name: "Edging" },
  { id: "aeration-overseeding", name: "Aeration & Overseeding" },
] as const;

export const ESTIMATE_PROPERTY_SIZES: readonly EstimatePropertySize[] = [
  { id: "small", name: "Small", description: "< 0.25 acre", icon: "Home" },
  {
    id: "medium",
    name: "Medium",
    description: "0.25 - 1 acre",
    icon: "Building",
  },
  {
    id: "large-estate",
    name: "Large Estate",
    description: "1+ acre",
    icon: "Building2",
  },
  {
    id: "customize",
    name: "Customize",
    description: "1+ acre",
    icon: "Pencil",
  },
] as const;

export const ESTIMATE_AREAS: readonly EstimateServiceArea[] = [
  { id: "leesburg", name: "Leesburg" },
  { id: "waterford", name: "Waterford" },
  { id: "lovettsville", name: "Lovettsville" },
  { id: "purcellville", name: "Purcellville" },
  { id: "hamilton", name: "Hamilton" },
] as const;
