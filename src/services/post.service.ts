import { apiService, type ApiResponse } from '@/lib/http'
import { objectToFormData } from '@/utils/formData'
import type { 
    IPost, 
    PostCreationAttributes, 
    PostQuery, 
    PostListResponse,
    SeoScoreResult
} from '@/types/post'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IPostService {
  getAll: (query?: PostQuery) => Promise<ApiResponse<PostListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IPost> | ResponseError>
  getBySlug: (slug: string) => Promise<ApiResponse<IPost> | ResponseError>
  create: (body: PostCreationAttributes) => Promise<ApiResponse<IPost> | ResponseError>
  update: (id: number, body: Partial<PostCreationAttributes>) => Promise<ApiResponse<IPost> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
  scoreSeo: (data: { title: string; slug: string; content: string }) => Promise<ApiResponse<SeoScoreResult> | ResponseError>
}

class PostService implements IPostService {
  getAll(query?: PostQuery): Promise<ApiResponse<PostListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.POSTS.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<PostListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IPost> | ResponseError> {
    return apiService(API_ROUTES.POSTS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IPost>()
  }

  getBySlug(slug: string): Promise<ApiResponse<IPost> | ResponseError> {
    return apiService(API_ROUTES.POSTS.GET_BY_SLUG)
      .addPathParam(':slug', slug)
      .get<IPost>()
  }

  create(body: PostCreationAttributes): Promise<ApiResponse<IPost> | ResponseError> {
    const formData = objectToFormData(body)
    return apiService(API_ROUTES.POSTS.CREATE)
      .post<IPost>(formData)
  }

  update(id: number, body: Partial<PostCreationAttributes>): Promise<ApiResponse<IPost> | ResponseError> {
    const formData = objectToFormData(body)
    return apiService(API_ROUTES.POSTS.UPDATE)
      .addPathParam(':id', id)
      .put<IPost>(formData)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.POSTS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }

  scoreSeo(data: { title: string; slug: string; content: string }): Promise<ApiResponse<SeoScoreResult> | ResponseError> {
    return apiService('/posts/score-seo') 
      .post<SeoScoreResult>(data)
  }
}

export const postService = new PostService()
