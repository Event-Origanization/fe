import { apiService, type ApiResponse } from '@/lib/http'
import type { 
    IHighlight, 
    CreateHighlightRequest, 
    UpdateHighlightRequest, 
    HighlightListResponse,
    HighlightQuery
} from '@/types/highlight'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IHighlightService {
  getPublic: () => Promise<ApiResponse<IHighlight[]> | ResponseError>
  getAdmin: (query?: HighlightQuery) => Promise<ApiResponse<HighlightListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IHighlight> | ResponseError>
  create: (body: CreateHighlightRequest) => Promise<ApiResponse<IHighlight> | ResponseError>
  update: (id: number, body: UpdateHighlightRequest) => Promise<ApiResponse<IHighlight> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class HighlightService implements IHighlightService {
  getPublic(): Promise<ApiResponse<IHighlight[]> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHTS.GET_ALL).get<IHighlight[]>()
  }

  getAdmin(query?: HighlightQuery): Promise<ApiResponse<HighlightListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.HIGHLIGHTS.GET_ADMIN)
    if (query) {
      api.addQueryParam({...query})
    }
    return api.get<HighlightListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IHighlight> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHTS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IHighlight>()
  }

  create(body: CreateHighlightRequest): Promise<ApiResponse<IHighlight> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHTS.CREATE)
      .post<IHighlight>(body)
  }

  update(id: number, body: UpdateHighlightRequest): Promise<ApiResponse<IHighlight> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHTS.UPDATE)
      .addPathParam(':id', id)
      .put<IHighlight>(body)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.HIGHLIGHTS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const highlightService = new HighlightService()
