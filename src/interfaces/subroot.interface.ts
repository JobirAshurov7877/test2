export interface SubRoot {
  id: number;
  title: string;
  image: null;
  rateValue: number;
  service: boolean;
  slug?: string;
  rateType: string;
  minOrderTime: number;
  subServices: [];
}
