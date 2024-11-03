import { SubService } from "./subservice.interface";

export interface ServiceRoot {
  id: number;
  image: string;
  rateValue: number;
  slug: string;
  title: string;
  service: boolean;
  description: string;
  subServices: SubService[];
}
