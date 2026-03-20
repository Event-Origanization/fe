<template>
  <div class="p-4 md:p-6 space-y-8 min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      <!-- Card Sản phẩm -->
      <div class="bg-blue-light-50 dark:bg-gray-800 border-l-[6px] border-blue-light-500 rounded-xl p-6 shadow-theme-sm relative overflow-hidden group hover:shadow-theme-md transition-all">
        <h4 class="text-title-lg font-bold text-blue-light-700 dark:text-blue-light-300 mb-1">{{ overview.products }}</h4>
        <span class="text-theme-sm font-semibold text-blue-light-600 dark:text-blue-light-400 uppercase tracking-wider">{{ $t('DASHBOARD.OVERVIEW.PRODUCTS') }}</span>
      </div>
      
      <!-- Card Bài viết -->
      <div class="bg-orange-50 dark:bg-gray-800 border-l-[6px] border-orange-500 rounded-xl p-6 shadow-theme-sm relative overflow-hidden group hover:shadow-theme-md transition-all">
        <h4 class="text-title-lg font-bold text-orange-700 dark:text-orange-300 mb-1">{{ overview.posts }}</h4>
        <span class="text-theme-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{{ $t('DASHBOARD.OVERVIEW.POSTS') }}</span>
      </div>
      
      <!-- Card Video Highlight -->
      <div class="bg-brand-50 dark:bg-gray-800 border-l-[6px] border-brand-500 rounded-xl p-6 shadow-theme-sm relative overflow-hidden group hover:shadow-theme-md transition-all">
        <h4 class="text-title-lg font-bold text-brand-700 dark:text-brand-300 mb-1">{{ overview.highlightVideos }}</h4>
        <span class="text-theme-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">{{ $t('DASHBOARD.OVERVIEW.VIDEOS') }}</span>
      </div>
      
      <!-- Card Người đăng ký -->
      <div class="bg-success-50 dark:bg-gray-800 border-l-[6px] border-success-500 rounded-xl p-6 shadow-theme-sm relative overflow-hidden group hover:shadow-theme-md transition-all">
        <h4 class="text-title-lg font-bold text-success-700 dark:text-success-300 mb-1">{{ overview.subscribers }}</h4>
        <span class="text-theme-sm font-semibold text-success-600 dark:text-success-400 uppercase tracking-wider">{{ $t('DASHBOARD.OVERVIEW.SUBSCRIBERS') }}</span>
      </div>
    </div>
    
    <!-- Biểu đồ chính Bar & Line -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 w-full">
      <div class="xl:col-span-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-theme-sm border border-gray-100 dark:border-gray-700 w-full overflow-hidden">
        <h4 class="text-theme-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">{{ $t('DASHBOARD.CHARTS.PRODUCTS_POSTS_TITLE') }}</h4>
        <div class="w-full relative min-h-[300px] flex items-center justify-center">
          <BarChartOne v-if="isChartDataLoaded" :series="barChartSeries" :colors="['#0ba5ec', '#ec4a0a']" class="w-full" />
          <span v-else class="text-gray-400">{{ $t('DASHBOARD.RECENT.LOADING') }}</span>
        </div>
      </div>
      <div class="xl:col-span-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-theme-sm border border-gray-100 dark:border-gray-700 w-full overflow-hidden">
        <h4 class="text-theme-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">{{ $t('DASHBOARD.CHARTS.SUBSCRIBERS_TITLE') }}</h4>
        <div class="w-full relative min-h-[300px] flex items-center justify-center">
          <LineChartOne v-if="isChartDataLoaded" :series="lineChartSeries" :colors="['#12b76a']" class="w-full" />
          <span v-else class="text-gray-400">{{ $t('DASHBOARD.RECENT.LOADING') }}</span>
        </div>
      </div>
    </div>

    <!-- Biểu đồ tỷ trọng (Donut) -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 w-full">
      <DonutChart 
        v-if="isChartDataLoaded" 
        :title="$t('DASHBOARD.CHARTS.POST_STATUS_TITLE')" 
        :series="[overview.postStats.published, overview.postStats.draft, overview.postStats.scheduled]" 
        :labels="[$t('DASHBOARD.CHARTS.POST_STATUS.PUBLISHED'), $t('DASHBOARD.CHARTS.POST_STATUS.DRAFT'), $t('DASHBOARD.CHARTS.POST_STATUS.SCHEDULED')]" 
        :colors="['#0ba5ec', '#fdb022', '#7a5af8']" 
      />
      <DonutChart 
        v-if="isChartDataLoaded" 
        :title="$t('DASHBOARD.CHARTS.PRODUCT_STATUS_TITLE')" 
        :series="[overview.productStats.active, overview.productStats.inactive]" 
        :labels="[$t('DASHBOARD.CHARTS.PRODUCT_STATUS.ACTIVE'), $t('DASHBOARD.CHARTS.PRODUCT_STATUS.INACTIVE')]" 
        :colors="['#12b76a', '#f04438']" 
      />
    </div>

    <!-- Danh sách Mới nhất (Tables) -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 w-full">
      <!-- Bảng Sản phẩm mới -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-theme-sm border border-gray-100 dark:border-gray-700 w-full overflow-hidden">
        <h4 class="text-theme-xl font-bold text-gray-800 dark:text-gray-100 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">{{ $t('DASHBOARD.RECENT.PRODUCTS_TITLE') }}</h4>
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900/50 text-left">
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.PRODUCT_NAME') }}</th>
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.PRICE') }}</th>
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.STATUS') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in overview.recentProducts" :key="product.id" class="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                <td class="py-3 px-4 text-theme-sm text-gray-800 dark:text-gray-200 truncate max-w-[200px]">{{ product.name_vi }}</td>
                <td class="py-3 px-4 text-theme-sm text-gray-800 dark:text-gray-200">{{ formatCurrency(product.price) }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2.5 py-1 text-xs font-medium rounded-full" 
                    :class="product.isActive ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400' : 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400'"
                  >
                    {{ product.isActive ? $t('DASHBOARD.RECENT.STATUS.ACTIVE') : $t('DASHBOARD.RECENT.STATUS.INACTIVE') }}
                  </span>
                </td>
              </tr>
              <tr v-if="!overview.recentProducts?.length">
                <td colspan="3" class="py-4 text-center text-gray-500">{{ $t('DASHBOARD.RECENT.NO_DATA') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bảng Người đăng ký mới -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-theme-sm border border-gray-100 dark:border-gray-700 w-full overflow-hidden">
        <h4 class="text-theme-xl font-bold text-gray-800 dark:text-gray-100 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">{{ $t('DASHBOARD.RECENT.SUBSCRIBERS_TITLE') }}</h4>
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900/50 text-left">
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.EMAIL') }}</th>
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.DATE') }}</th>
                <th class="py-3 px-4 text-theme-sm font-semibold text-gray-600 dark:text-gray-300">{{ $t('DASHBOARD.RECENT.TABLE.STATUS') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sub in overview.recentSubscribers" :key="sub.id" class="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                <td class="py-3 px-4 text-theme-sm text-gray-800 dark:text-gray-200">{{ sub.email }}</td>
                <td class="py-3 px-4 text-theme-sm text-gray-500 dark:text-gray-400">{{ new Date(sub.createdAt).toLocaleDateString($t('COMMON.DATE_LOCALE') || 'vi-VN') }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2.5 py-1 text-xs font-medium rounded-full" 
                    :class="sub.isActive ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400' : 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400'"
                  >
                    {{ sub.isActive ? $t('DASHBOARD.RECENT.STATUS.SUBSCRIBED') : $t('DASHBOARD.RECENT.STATUS.UNSUBSCRIBED') }}
                  </span>
                </td>
              </tr>
              <tr v-if="!overview.recentSubscribers?.length">
                <td colspan="3" class="py-4 text-center text-gray-500">{{ $t('DASHBOARD.RECENT.NO_DATA') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDashboardStore } from '@/store/dashboard.store'
import BarChartOne from '@/components/charts/BarChart/BarChartOne.vue'
import LineChartOne from '@/components/charts/LineChart/LineChartOne.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import { formatCurrency } from '@/utils/common'

defineOptions({
  name: 'HomePage',
})

const dashboardStore = useDashboardStore()
const { t } = useI18n()

const overview = computed(() => dashboardStore.overview)
const isChartDataLoaded = computed(() => dashboardStore.charts !== null && !dashboardStore.loading)

const barChartSeries = computed(() => {
  if (!dashboardStore.charts) return []
  const bChart = dashboardStore.charts.barChart
  return [
    { name: t('DASHBOARD.OVERVIEW.PRODUCTS'), data: bChart.products },
    { name: t('DASHBOARD.OVERVIEW.POSTS'), data: bChart.posts },
  ]
})

const lineChartSeries = computed(() => {
  if (!dashboardStore.charts) return []
  const lChart = dashboardStore.charts.lineChart
  return [
    { name: t('DASHBOARD.OVERVIEW.SUBSCRIBERS'), data: lChart.subscribers },
  ]
})

onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>
