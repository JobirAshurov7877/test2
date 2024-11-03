export interface SubService {
  title: string;
  image: string | undefined;
  metaDescription: string | undefined;
  metaKeywords: string | undefined;
  metaTitle: string | undefined;
  aboutText: string ;
  description: string;
  rateValue: number;
  rateType: string;
  minOrderTime: number;
  service: boolean;
  id: number;
  slug?: string;
}
