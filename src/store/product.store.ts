import { defineStore } from 'pinia'
import { productService } from '@/services/product.service'
import type { 
    IProduct, 
    ProductCreationAttributes, 
    ProductQuery 
} from '@/types/product'
import { ResponseError } from '@/utils/error'
import { PAGE_KEYS } from '@/constants'

interface ProductState {
  // Admin & Generic
  products: IProduct[]
  total: number
  totalPages: number
  currentPage: number
  
  // Sound & Light Page
  soundLightProducts: IProduct[]
  soundLightTotalPages: number
  soundLightCurrentPage: number

  // Rental Page
  rentalProducts: IProduct[]
  rentalTotalPages: number
  rentalCurrentPage: number

  loading: boolean
  error: string | null
  currentProduct: IProduct | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,

    soundLightProducts: [],
    soundLightTotalPages: 0,
    soundLightCurrentPage: 1,

    rentalProducts: [],
    rentalTotalPages: 0,
    rentalCurrentPage: 1,

    loading: false,
    error: null,
    currentProduct: null,
  }),

  actions: {
    async fetchProducts(query?: ProductQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.getAll(query)

        if (result instanceof ResponseError) throw result

        this.products = result.data.products
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchPublicProducts(query: ProductQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.getAll(query)
        if (result instanceof ResponseError) throw result

        const { products, totalPages, currentPage } = result.data

        if (query.productType === PAGE_KEYS.SOUND_LIGHT) {
          this.soundLightProducts = products
          this.soundLightTotalPages = totalPages
          this.soundLightCurrentPage = currentPage
        } else if (query.productType === PAGE_KEYS.RENTAL) {
          this.rentalProducts = products
          this.rentalTotalPages = totalPages
          this.rentalCurrentPage = currentPage
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchProductBySlug(slug: string) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.getBySlug(slug)
        if (result instanceof ResponseError) throw result
        this.currentProduct = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.getById(id)
        
        if (result instanceof ResponseError) throw result

        this.currentProduct = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async createProduct(data: ProductCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.create(data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchProducts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id: number, data: Partial<ProductCreationAttributes>) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.update(id, data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchProducts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await productService.delete(id)
        
        if (result instanceof ResponseError) throw result
        
        await this.fetchProducts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentProduct(product: IProduct | null) {
      this.currentProduct = product
    }
  }
})
