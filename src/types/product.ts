import { PAGE_KEYS } from "@/constants";

export interface IProduct {
  id: number;
  name_vi: string;
  name_en: string;
  name_zh: string;
  slug: string;
  price: number;
  images: string[];
  isActive: boolean;
  productType: typeof PAGE_KEYS.SOUND_LIGHT | typeof PAGE_KEYS.RENTAL;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreationAttributes {
  name_vi: string;
  name_en?: string;
  name_zh?: string;
  slug: string;
  price: number;
  images?: string[];
  isActive?: boolean;
  productType: typeof PAGE_KEYS.SOUND_LIGHT | typeof PAGE_KEYS.RENTAL;
  translateName?: boolean;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  productType?: typeof PAGE_KEYS.SOUND_LIGHT | typeof PAGE_KEYS.RENTAL;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ProductListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  products: IProduct[];
}
