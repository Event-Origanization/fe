import { defineStore } from 'pinia'
import { newsletterService } from '@/services/newsletter.service'
import type { 
    INewsletterSubscriber, 
    NewsletterSubscriberQuery 
} from '@/types/newsletter-subscriber'
import { ResponseError } from '@/utils/error'

interface NewsletterState {
  subscribers: INewsletterSubscriber[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
}

export const useNewsletterStore = defineStore('newsletter', {
  state: (): NewsletterState => ({
    subscribers: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  }),

  actions: {
    async subscribe(email: string) {
      this.loading = true
      this.error = null
      try {
        const result = await newsletterService.subscribe(email)
        if (result instanceof ResponseError) throw result
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi đăng ký'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchSubscribers(query?: NewsletterSubscriberQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await newsletterService.getAll(query)
        if (result instanceof ResponseError) throw result

        this.subscribers = result.data.subscribers
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi lấy danh sách'
      } finally {
        this.loading = false
      }
    },

    async updateSubscriber(id: number, data: { isActive: boolean }) {
      this.loading = true
      this.error = null
      try {
        const result = await newsletterService.update(id, data)
        if (result instanceof ResponseError) throw result
        await this.fetchSubscribers({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi cập nhật'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteSubscriber(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await newsletterService.delete(id)
        if (result instanceof ResponseError) throw result
        await this.fetchSubscribers({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi xóa'
        throw err
      } finally {
        this.loading = false
      }
    },
  }
})
