export type ServiceId =
  | "mulch"
  | "lawn-maintenance"
  | "spring-fall-cleanup"
  | "planting"
  | "edging"
  | "aeration-overseeding";

export type PropertySize = "small" | "medium" | "large" | "customize";

export interface EstimateService {
  id: ServiceId;
  name: string;
}

export interface EstimatePropertySize {
  id: PropertySize;
  name: string;
  description: string;
  icon: string;
}

export type ServiceArea =
  | "leesburg"
  | "waterford"
  | "lovettsville"
  | "purcellville"
  | "hamilton";

export interface EstimateServiceArea {
  id: ServiceArea;
  name: string;
}
