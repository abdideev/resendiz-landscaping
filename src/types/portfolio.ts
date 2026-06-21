import { GalleryImage } from "./gallery";

export interface PortfolioItem {
  id: string;
  title: string;
  service: string;
  image: string;
  beforeImage: string;
  afterImage: string;
  gallery: GalleryImage[];
}
