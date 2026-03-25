import { apiService, type ApiResponse } from '@/lib/http'
import { API_ROUTES } from '@/constants'
import type { ResponseError } from '@/utils/error'

export interface UploadImageResponse {
  location: string;
}

export interface IUploadService {
  uploadImage: (file: File | Blob) => Promise<ApiResponse<UploadImageResponse> | ResponseError>
}

class UploadService implements IUploadService {
  uploadImage(file: File | Blob): Promise<ApiResponse<UploadImageResponse> | ResponseError> {
    const formData = new FormData()
    formData.append('file', file)
    return apiService(API_ROUTES.UPLOAD.IMAGE).post<UploadImageResponse>(formData)
  }
}

export const uploadService = new UploadService()
