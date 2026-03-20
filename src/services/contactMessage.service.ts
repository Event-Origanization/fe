import { apiService, type ApiResponse } from '@/lib/http'
import type { IContactMessage, ContactMessageCreationAttributes, ContactMessageQuery, ContactMessageListResponse } from '@/types/contactMessage'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants/routes'

export interface IContactMessageService {
  getAll: (query?: ContactMessageQuery) => Promise<ApiResponse<ContactMessageListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IContactMessage> | ResponseError>
  create: (body: ContactMessageCreationAttributes) => Promise<ApiResponse<IContactMessage> | ResponseError>
  markAsRead: (id: number, isRead: boolean) => Promise<ApiResponse<IContactMessage> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class ContactMessageService implements IContactMessageService {
  getAll(query?: ContactMessageQuery): Promise<ApiResponse<ContactMessageListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.CONTACT_MESSAGES.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<ContactMessageListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IContactMessage> | ResponseError> {
    return apiService(API_ROUTES.CONTACT_MESSAGES.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IContactMessage>()
  }

  create(body: ContactMessageCreationAttributes): Promise<ApiResponse<IContactMessage> | ResponseError> {
    return apiService(API_ROUTES.CONTACT_MESSAGES.CREATE).post<IContactMessage>(body)
  }

  markAsRead(id: number, isRead: boolean): Promise<ApiResponse<IContactMessage> | ResponseError> {
    return apiService(API_ROUTES.CONTACT_MESSAGES.MARK_AS_READ)
      .addPathParam(':id', id)
      .put<IContactMessage>({ isRead })
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.CONTACT_MESSAGES.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const contactMessageService = new ContactMessageService()
