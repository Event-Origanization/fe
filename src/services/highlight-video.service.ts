import { apiService, type ApiResponse } from '@/lib/http'
import type { 
    IHighlightVideo, 
    HighlightVideoCreationAttributes, 
    HighlightVideoQuery, 
    HighlightVideoListResponse 
} from '@/types/highlight-video'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IHighlightVideoService {
  getAll: (query?: HighlightVideoQuery) => Promise<ApiResponse<HighlightVideoListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IHighlightVideo> | ResponseError>
  create: (body: HighlightVideoCreationAttributes) => Promise<ApiResponse<IHighlightVideo> | ResponseError>
  update: (id: number, body: Partial<HighlightVideoCreationAttributes>) => Promise<ApiResponse<IHighlightVideo> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class HighlightVideoService implements IHighlightVideoService {
  getAll(query?: HighlightVideoQuery): Promise<ApiResponse<HighlightVideoListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.HIGHLIGHT_VIDEOS.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<HighlightVideoListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IHighlightVideo> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHT_VIDEOS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IHighlightVideo>()
  }

  create(body: HighlightVideoCreationAttributes): Promise<ApiResponse<IHighlightVideo> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHT_VIDEOS.CREATE)
      .post<IHighlightVideo>(body)
  }

  update(id: number, body: Partial<HighlightVideoCreationAttributes>): Promise<ApiResponse<IHighlightVideo> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHT_VIDEOS.UPDATE)
      .addPathParam(':id', id)
      .put<IHighlightVideo>(body)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHT_VIDEOS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const highlightVideoService = new HighlightVideoService()
