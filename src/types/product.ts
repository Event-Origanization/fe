export interface IProduct {
  id: number;
  name_vi: string;
  name_en: string;
  name_zh: string;
  slug: string;
  content_vi: string;
  content_en: string;
  content_zh: string;
  price: number;
  images: string[];
  variants: Record<string, unknown>[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreationAttributes {
  name_vi: string;
  name_en?: string;
  name_zh?: string;
  slug: string;
  content_vi: string;
  content_en?: string;
  content_zh?: string;
  price: number;
  images?: string[];
  variants?: Record<string, unknown>[];
  isActive?: boolean;
  translateName?: boolean;
  translateContent?: boolean;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ProductListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  products: IProduct[];
}
