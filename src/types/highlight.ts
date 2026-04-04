export interface IHighlight {
  id: number;
  title_vi: string;
  title_en: string;
  title_zh: string;
  content_vi: string;
  content_en: string;
  content_zh: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHighlightRequest {
  title_vi: string;
  title_en?: string;
  title_zh?: string;
  content_vi: string;
  content_en?: string;
  content_zh?: string;
  orderIndex?: number;
  translateTitle?: boolean;
  translateContent?: boolean;
}

export type UpdateHighlightRequest = Partial<CreateHighlightRequest>;

export interface HighlightQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  [key: string]: string | number | boolean | undefined | null;
}

export interface HighlightListResponse {
  highlights: IHighlight[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
