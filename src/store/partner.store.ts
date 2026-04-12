import { defineStore } from 'pinia'
import { partnerService } from '@/services/partner.service'
import type { IPartner, PartnerCreationAttributes, PartnerQuery } from '@/types/partner'
import { ResponseError } from '@/utils/error'

interface PartnerState {
  partners: IPartner[]
  activePartners: IPartner[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  currentPartner: IPartner | null
  currentQuery: PartnerQuery | null
}

export const usePartnerStore = defineStore('partner', {
  state: (): PartnerState => ({
    partners: [],
    activePartners: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    currentPartner: null,
    currentQuery: null,
  }),

  actions: {
    async fetchPartners(query?: PartnerQuery) {
      this.loading = true
      this.error = null
      this.currentQuery = query || null
      try {
        const result = await partnerService.getAll(query)
        if (result instanceof ResponseError) throw result
        this.partners = result.data.partners
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi tải danh sách đối tác'
      } finally {
        this.loading = false
      }
    },

    async fetchActivePartners() {
      this.loading = true
      this.error = null
      try {
        const result = await partnerService.getActive()
        if (result instanceof ResponseError) throw result
        this.activePartners = result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi tải danh sách đối tác'
      } finally {
        this.loading = false
      }
    },

    async createPartner(data: PartnerCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await partnerService.create(data)
        if (result instanceof ResponseError) throw result
        await this.fetchPartners(this.currentQuery || { page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi tạo đối tác'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updatePartner(id: number, data: Partial<PartnerCreationAttributes>) {
      this.loading = true
      this.error = null
      try {
        const result = await partnerService.update(id, data)
        if (result instanceof ResponseError) throw result
        await this.fetchPartners(this.currentQuery || { page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi cập nhật đối tác'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deletePartner(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await partnerService.delete(id)
        if (result instanceof ResponseError) throw result
        await this.fetchPartners(this.currentQuery || { page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Lỗi khi xóa đối tác'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentPartner(partner: IPartner | null) {
      this.currentPartner = partner
    },
  },
})
