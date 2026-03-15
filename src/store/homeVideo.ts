import { defineStore } from 'pinia'
import { homeVideoService } from '@/services/homeVideo.service'
import type { 
    IHomeVideo, 
    HomeVideoCreationAttributes, 
    HomeVideoQuery 
} from '@/types/home-video'
import { ResponseError } from '@/utils/error'

interface HomeVideoState {
  videos: IHomeVideo[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  currentVideo: IHomeVideo | null
}

export const useHomeVideoStore = defineStore('home-video', {
  state: (): HomeVideoState => ({
    videos: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    currentVideo: null,
  }),

  actions: {
    async fetchVideos(query?: HomeVideoQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await homeVideoService.getAll(query)

        if (result instanceof ResponseError) throw result

        this.videos = result.data.videos
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchVideoById(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await homeVideoService.getById(id)
        
        if (result instanceof ResponseError) throw result

        this.currentVideo = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async createVideo(data: HomeVideoCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await homeVideoService.create(data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchVideos({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateVideo(id: number, data: Partial<HomeVideoCreationAttributes>) {
      this.loading = true
      this.error = null
      try {
        const result = await homeVideoService.update(id, data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchVideos({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteVideo(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await homeVideoService.delete(id)
        
        if (result instanceof ResponseError) throw result
        
        await this.fetchVideos({ page: this.currentPage })
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentVideo(video: IHomeVideo | null) {
      this.currentVideo = video
    }
  }
})
