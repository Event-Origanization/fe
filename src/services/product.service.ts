import { apiService, type ApiResponse } from '@/lib/http'
import { objectToFormData } from '@/utils/formData'
import type { 
    IProduct, 
    ProductCreationAttributes, 
    ProductQuery, 
    ProductListResponse 
} from '@/types/product'
import type { ResponseError } from '@/utils/error'
import { API_ROUTES } from '@/constants'

export interface IProductService {
  getAll: (query?: ProductQuery) => Promise<ApiResponse<ProductListResponse> | ResponseError>
  getById: (id: number) => Promise<ApiResponse<IProduct> | ResponseError>
  getBySlug: (slug: string) => Promise<ApiResponse<IProduct> | ResponseError>
  create: (body: ProductCreationAttributes) => Promise<ApiResponse<IProduct> | ResponseError>
  update: (id: number, body: Partial<ProductCreationAttributes>) => Promise<ApiResponse<IProduct> | ResponseError>
  delete: (id: number) => Promise<ApiResponse<null> | ResponseError>
}

class ProductService implements IProductService {
  getAll(query?: ProductQuery): Promise<ApiResponse<ProductListResponse> | ResponseError> {
    const api = apiService(API_ROUTES.PRODUCTS.GET_ALL)
    if (query) {
      api.addQueryParam(query as unknown as Record<string, string | number | boolean | undefined | null>)
    }
    return api.get<ProductListResponse>()
  }

  getById(id: number): Promise<ApiResponse<IProduct> | ResponseError> {
    return apiService(API_ROUTES.PRODUCTS.GET_BY_ID)
      .addPathParam(':id', id)
      .get<IProduct>()
  }

  getBySlug(slug: string): Promise<ApiResponse<IProduct> | ResponseError> {
    return apiService(API_ROUTES.PRODUCTS.GET_BY_SLUG)
      .addPathParam(':slug', slug)
      .get<IProduct>()
  }

  create(body: ProductCreationAttributes): Promise<ApiResponse<IProduct> | ResponseError> {
    const formData = objectToFormData(body as unknown as Record<string, unknown>)
    return apiService(API_ROUTES.PRODUCTS.CREATE)
      .post<IProduct>(formData)
  }

  update(id: number, body: Partial<ProductCreationAttributes>): Promise<ApiResponse<IProduct> | ResponseError> {
    const formData = objectToFormData(body)
    return apiService(API_ROUTES.PRODUCTS.UPDATE)
      .addPathParam(':id', id)
      .put<IProduct>(formData)
  }

  delete(id: number): Promise<ApiResponse<null> | ResponseError> {
    return apiService(API_ROUTES.PRODUCTS.DELETE)
      .addPathParam(':id', id)
      .delete<null>()
  }
}

export const productService = new ProductService()
