import { apiService, type ApiResponse } from '@/lib/http'
import { type ResponseError } from '@/utils/error'
import type { ISeoMeta, SeoMetaUpdatePayload } from '@/types/seo'
import { API_ROUTES } from '@/constants/routes'

export const SeoService = {
  async getAllSeoMeta(): Promise<ApiResponse<ISeoMeta[]> | ResponseError> {
    return apiService(API_ROUTES.SEO.GET_ALL).get<ISeoMeta[]>();
  },

  async getSeoMetaByPage(pageKey: string): Promise<ApiResponse<ISeoMeta> | ResponseError> {
    return apiService(API_ROUTES.SEO.GET_BY_PAGE).addPathParam(':pageKey', pageKey).get<ISeoMeta>();
  },

  async updateSeoMeta(pageKey: string, data: SeoMetaUpdatePayload): Promise<ApiResponse<ISeoMeta> | ResponseError> {
    return apiService(API_ROUTES.SEO.UPDATE).addPathParam(':pageKey', pageKey).put<ISeoMeta>(data);
  },
};
