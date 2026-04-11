export enum POST_DISPLAY_LOCATION {
  EVENT_IMAGE = 'EVENT_IMAGE',
  WEEKLY_HIGHLIGHT = 'WEEKLY_HIGHLIGHT',
  OTHER_POST = 'OTHER_POST'
}

export interface IPost {
  id: number;
  title_vi: string;
  title_en?: string;
  title_zh?: string;
  slug: string;
  content_vi: string;
  content_en?: string;
  content_zh?: string;
  media?: string;
  status: string;
  publishAt?: string | null;
  seoScore?: number | null;
  seoAnalysis?: string | null;
  seoSuggestions?: string | null;
  display_locations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PostCreationAttributes {
  title_vi: string;
  title_en?: string;
  title_zh?: string;
  slug: string;
  content_vi: string;
  content_en?: string;
  content_zh?: string;
  media?: string;
  status?: string;
  publishAt?: string | null;
  seoScore?: number | null;
  seoAnalysis?: string | null;
  seoSuggestions?: string | null;
  translateTitle?: boolean;
  translateContent?: boolean;
  display_locations?: string[];
}

export interface PostQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  displayLocation?: string;
}

export interface PostListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  posts: IPost[];
}

export interface SeoScoreResult {
  score: number;
  analysis: string;
  suggestions: string;
}
