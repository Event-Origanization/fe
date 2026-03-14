import { apiService, type ApiResponse } from '@/lib/http'
import { type ResponseError } from '@/utils/error'
import type { IWebsiteConfig, WebsiteConfigUpdatePayload, BulkUpdateConfigsPayload } from '@/types/config'
import { API_ROUTES } from '@/constants/routes'

export const ConfigService = {
  async getAllConfigs(): Promise<ApiResponse<IWebsiteConfig[]> | ResponseError> {
    return apiService(API_ROUTES.CONFIGS.GET_ALL).get<IWebsiteConfig[]>();
  },

  async getConfigsByGroup(group: string): Promise<ApiResponse<IWebsiteConfig[]> | ResponseError> {
    return apiService(API_ROUTES.CONFIGS.GET_BY_GROUP).addPathParam(':group', group).get<IWebsiteConfig[]>();
  },

  async updateConfig(key: string, data: WebsiteConfigUpdatePayload): Promise<ApiResponse<IWebsiteConfig> | ResponseError> {
    return apiService(API_ROUTES.CONFIGS.UPDATE).addPathParam(':key', key).put<IWebsiteConfig>(data);
  },

  async bulkUpdateConfigs(data: BulkUpdateConfigsPayload): Promise<ApiResponse<void> | ResponseError> {
    return apiService(API_ROUTES.CONFIGS.BULK_UPDATE).put<void>(data);
  }
}
