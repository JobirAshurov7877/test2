import { SubService } from "./subservice.interface";

export interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  subServices?: SubService[];
}
