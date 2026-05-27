export interface IHighlightVideo {
  id: number;
  title_vi: string;
  title_en?: string;
  title_zh?: string;
  url: string;
  thumbnail?: string | null;
  orderIndex: number;
  publishAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HighlightVideoCreationAttributes {
  title_vi: string;
  title_en?: string;
  title_zh?: string;
  url: string;
  thumbnail?: string | null;
  orderIndex?: number;
  isActive?: boolean;
  translateTitle?: boolean;
}

export interface HighlightVideoQuery {
  page?: number;
  limit?: number;
  skip?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface HighlightVideoListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  videos: IHighlightVideo[];
}
