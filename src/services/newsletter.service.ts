import { apiService, type ApiResponse } from '@/lib/http'
import type { 
    INewsletterSubscriber, 
    NewsletterSubscriberQuery, 
    NewsletterSubscriberListResponse 
} from '@/types/newsletter-subscriber'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface INewsletterService {
  subscribe: (email: string) => Promise<ApiResponse<INewsletterSubscriber> | ResponseError>
  getAll: (query?: NewsletterSubscriberQuery) => Promise<ApiResponse<NewsletterSubscriberListResponse> | ResponseError>
  update: (id: number, data: { isActive: boolean }) => Promise<ApiResponse<INewsletterSubscriber> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class NewsletterService implements INewsletterService {
  subscribe(email: string): Promise<ApiResponse<INewsletterSubscriber> | ResponseError> {
    return apiService(API_ROUTES.NEWSLETTER.SUBSCRIBE)
      .post<INewsletterSubscriber>({ email })
  }

  getAll(query?: NewsletterSubscriberQuery): Promise<ApiResponse<NewsletterSubscriberListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.NEWSLETTER.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<NewsletterSubscriberListResponse>()
  }

  update(id: number, data: { isActive: boolean }): Promise<ApiResponse<INewsletterSubscriber> | ResponseError> {
    return apiService(API_ROUTES.NEWSLETTER.UPDATE)
      .addPathParam(':id', id)
      .put<INewsletterSubscriber>(data)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.NEWSLETTER.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const newsletterService = new NewsletterService()
