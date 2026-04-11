import { defineStore } from 'pinia'
import { postService } from '@/services/post.service'
import type { 
    IPost, 
    PostCreationAttributes, 
    PostQuery
} from '@/types/post'
import { POST_DISPLAY_LOCATION } from '@/types/post'
import { ResponseError } from '@/utils/error'

interface PostState {
  posts: IPost[]
  total: number
  totalPages: number
  currentPage: number
  loading: boolean
  loadingHighlights: boolean
  loadingLatestPosts: boolean
  loadingRecentNews: boolean
  error: string | null
  errorHighlights: string | null
  errorLatestPosts: string | null
  errorRecentNews: string | null
  currentPost: IPost | null
  recentNews: IPost[]
  weeklyHighlights: IPost[]
  latestPosts: IPost[]
}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    loadingHighlights: false,
    loadingLatestPosts: false,
    loadingRecentNews: false,
    error: null,
    errorHighlights: null,
    errorLatestPosts: null,
    errorRecentNews: null,
    currentPost: null,
    recentNews: [],
    weeklyHighlights: [],
    latestPosts: [],
  }),

  actions: {
    async fetchPosts(query?: PostQuery) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.getAll(query)

        if (result instanceof ResponseError) throw result

        this.posts = result.data.posts
        this.total = result.data.total
        this.totalPages = result.data.totalPages
        this.currentPage = result.data.currentPage
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchRecentNews(limit: number = 50, displayLocation?: string) {
      this.loadingRecentNews = true
      this.errorRecentNews = null
      try {
        const result = await postService.getAll({ limit, displayLocation })

        if (result instanceof ResponseError) throw result

        this.recentNews = result.data.posts
      } catch (err) {
        this.errorRecentNews = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loadingRecentNews = false
      }
    },

    async fetchWeeklyHighlights() {
      this.loadingHighlights = true
      this.errorHighlights = null
      try {
        const result = await postService.getAll({ limit: 4, displayLocation: POST_DISPLAY_LOCATION.WEEKLY_HIGHLIGHT })
        if (result instanceof ResponseError) throw result
        this.weeklyHighlights = result.data.posts
      } catch (err) {
        this.errorHighlights = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loadingHighlights = false
      }
    },

    async fetchLatestPosts(limit: number = 10) {
      this.loadingLatestPosts = true
      this.errorLatestPosts = null
      try {
        const result = await postService.getAll({ limit, sortBy: 'createdAt', sortOrder: 'DESC' })
        if (result instanceof ResponseError) throw result
        this.latestPosts = result.data.posts
      } catch (err) {
        this.errorLatestPosts = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loadingLatestPosts = false
      }
    },

    async fetchPostBySlug(slug: string) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.getBySlug(slug)
        if (result instanceof ResponseError) throw result
        this.currentPost = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchPostById(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.getById(id)
        
        if (result instanceof ResponseError) throw result

        this.currentPost = result.data
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    },

    async createPost(data: PostCreationAttributes) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.create(data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchPosts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updatePost(id: number, data: Partial<PostCreationAttributes>) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.update(id, data)
        
        if (result instanceof ResponseError) throw result

        await this.fetchPosts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deletePost(id: number) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.delete(id)
        
        if (result instanceof ResponseError) throw result
        
        await this.fetchPosts({ page: this.currentPage }) // Refresh list
        return result
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentPost(post: IPost | null) {
      this.currentPost = post
    },

    async scoreSeo(data: { title: string; slug: string; content: string }) {
      this.loading = true
      this.error = null
      try {
        const result = await postService.scoreSeo(data)
        if (result instanceof ResponseError) throw result
        return result.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
