import { defineStore } from 'pinia'
import { dashboardService } from '@/services/dashboard.service'
import type { DashboardOverview, DashboardYearlyCharts } from '@/types/dashboard'
import { ResponseError } from '@/utils/error'

interface DashboardState {
  overview: DashboardOverview
  charts: DashboardYearlyCharts | null
  loading: boolean
  error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    overview: {
      products: 0,
      posts: 0,
      highlightVideos: 0,
      contactMessages: 0,
      productStats: {
        active: 0,
        inactive: 0,
      },
      postStats: {
        published: 0,
        draft: 0,
        scheduled: 0,
      },
      recentProducts: [],
      recentContactMessages: [],
    },
    charts: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true
      this.error = null
      
      try {
        const [overviewRes, chartsRes] = await Promise.all([
          dashboardService.getOverview(),
          dashboardService.getYearlyCharts(),
        ])

        if (overviewRes instanceof ResponseError) throw overviewRes
        if (chartsRes instanceof ResponseError) throw chartsRes

        if (overviewRes.data) {
          this.overview = overviewRes.data
        }
        
        if (chartsRes.data) {
          this.charts = chartsRes.data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    }
  }
})
