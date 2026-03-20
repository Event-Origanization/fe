import { defineStore } from 'pinia'
import { contactMessageService } from '@/services/contactMessage.service'
import type { IContactMessage, ContactMessageCreationAttributes, ContactMessageQuery } from '@/types/contactMessage'
import { ResponseError } from '@/utils/error'

interface ContactMessageState {
  contactMessages: IContactMessage[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  currentMessage: IContactMessage | null
}

export const useContactMessageStore = defineStore('contactMessage', {
  state: (): ContactMessageState => ({
    contactMessages: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    currentMessage: null,
  }),

  actions: {
    async fetchContactMessages(query?: ContactMessageQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await contactMessageService.getAll(query)
        if (result instanceof ResponseError) throw result
        this.contactMessages = result.data.contactMessages
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi tải danh sách tin nhắn'
        throw err
      } finally {
        this.loading = false
      }
    },

    async createContactMessage(data: ContactMessageCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await contactMessageService.create(data)
        if (result instanceof ResponseError) throw result
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi gửi tin nhắn'
        throw err
      } finally {
        this.loading = false
      }
    },

    async markAsRead(id: number, isRead: boolean) {
      this.loading = true
      this.error = null
      try {
        const result = await contactMessageService.markAsRead(id, isRead)
        if (result instanceof ResponseError) throw result
        await this.fetchContactMessages({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi cập nhật trạng thái tin nhắn'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteContactMessage(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await contactMessageService.delete(id)
        if (result instanceof ResponseError) throw result
        await this.fetchContactMessages({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi xóa tin nhắn'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentMessage(message: IContactMessage | null) {
      this.currentMessage = message
    },
  },
})
