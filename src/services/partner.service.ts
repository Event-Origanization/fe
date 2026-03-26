import { apiService, type ApiResponse } from '@/lib/http'
import { objectToFormData } from '@/utils/formData'
import type { IPartner, PartnerCreationAttributes, PartnerQuery, PartnerListResponse } from '@/types/partner'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IPartnerService {
  getAll: (query?: PartnerQuery) => Promise<ApiResponse<PartnerListResponse> | ResponseError>
  getActive: () => Promise<ApiResponse<IPartner[]> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IPartner> | ResponseError>
  create: (body: PartnerCreationAttributes) => Promise<ApiResponse<IPartner> | ResponseError>
  update: (id: number, body: Partial<PartnerCreationAttributes>) => Promise<ApiResponse<IPartner> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class PartnerService implements IPartnerService {
  getAll(query?: PartnerQuery): Promise<ApiResponse<PartnerListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.PARTNERS.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<PartnerListResponse>()
  }

  getActive(): Promise<ApiResponse<IPartner[]> | ResponseError> {
    return apiService(API_ROUTES.PARTNERS.GET_ACTIVE).get<IPartner[]>()
  }

  getById(id: number): Promise<ApiResponse<IPartner> | ResponseError> {
    return apiService(API_ROUTES.PARTNERS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IPartner>()
  }

  create(body: PartnerCreationAttributes): Promise<ApiResponse<IPartner> | ResponseError> {
    const formData = objectToFormData(body)
    return apiService(API_ROUTES.PARTNERS.CREATE).post<IPartner>(formData)
  }

  update(id: number, body: Partial<PartnerCreationAttributes>): Promise<ApiResponse<IPartner> | ResponseError> {
    const formData = objectToFormData(body)
    return apiService(API_ROUTES.PARTNERS.UPDATE)
      .addPathParam(':id', id)
      .put<IPartner>(formData)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.PARTNERS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const partnerService = new PartnerService()
