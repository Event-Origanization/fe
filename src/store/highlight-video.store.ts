import { defineStore } from 'pinia'
import { highlightVideoService } from '@/services/highlight-video.service'
import type { 
    IHighlightVideo, 
    HighlightVideoCreationAttributes, 
    HighlightVideoQuery 
} from '@/types/highlight-video'
import { ResponseError } from '@/utils/error'

interface VideoState {
  videos: IHighlightVideo[]
  featuredVideos: IHighlightVideo[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  currentVideo: IHighlightVideo | null
}

export const useVideoStore = defineStore('highlight-video', {
  state: (): VideoState => ({
    videos: [],
    featuredVideos: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    currentVideo: null,
  }),

  actions: {
    async fetchVideos(query?: HighlightVideoQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await highlightVideoService.getAll(query)

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

    async fetchFeaturedVideos() {
      try {
        const result = await highlightVideoService.getAll({ limit: 5, page: 1, isActive: true })
        if (result instanceof ResponseError) throw result
        this.featuredVideos = result.data.videos
      } catch (err) {
        console.error('Error fetching featured videos:', err)
      }
    },

    async fetchVideoById(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await highlightVideoService.getById(id)
        
        if (result instanceof ResponseError) throw result

        this.currentVideo = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async createVideo(data: HighlightVideoCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await highlightVideoService.create(data)
        
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

    async updateVideo(id: number, data: Partial<HighlightVideoCreationAttributes>) {
      this.loading = true
      this.error = null
      try {
        const result = await highlightVideoService.update(id, data)
        
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
        const result = await highlightVideoService.delete(id)
        
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

    setCurrentVideo(video: IHighlightVideo | null) {
      this.currentVideo = video
    }
  }
})
