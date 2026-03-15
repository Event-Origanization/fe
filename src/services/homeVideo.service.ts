import { apiService, type ApiResponse } from '@/lib/http'
import type { 
    IHomeVideo, 
    HomeVideoCreationAttributes, 
    HomeVideoQuery, 
    HomeVideoListResponse 
} from '@/types/home-video'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IHomeVideoService {
  getAll: (query?: HomeVideoQuery) => Promise<ApiResponse<HomeVideoListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IHomeVideo> | ResponseError>
  create: (body: HomeVideoCreationAttributes) => Promise<ApiResponse<IHomeVideo> | ResponseError>
  update: (id: number, body: Partial<HomeVideoCreationAttributes>) => Promise<ApiResponse<IHomeVideo> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class HomeVideoService implements IHomeVideoService {
  getAll(query?: HomeVideoQuery): Promise<ApiResponse<HomeVideoListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.HOME_VIDEOS.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<HomeVideoListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IHomeVideo> | ResponseError> {
    return apiService(API_ROUTES.HOME_VIDEOS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IHomeVideo>()
  }

  create(body: HomeVideoCreationAttributes): Promise<ApiResponse<IHomeVideo> | ResponseError> {
    return apiService(API_ROUTES.HOME_VIDEOS.CREATE)
      .post<IHomeVideo>(body)
  }

  update(id: number, body: Partial<HomeVideoCreationAttributes>): Promise<ApiResponse<IHomeVideo> | ResponseError> {
    return apiService(API_ROUTES.HOME_VIDEOS.UPDATE)
      .addPathParam(':id', id)
      .put<IHomeVideo>(body)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.HOME_VIDEOS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const homeVideoService = new HomeVideoService()
