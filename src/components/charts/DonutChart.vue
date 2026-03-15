<template>
  <div class="w-full rounded-sm bg-white px-5 pb-5 pt-7.5 shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-boxdark sm:px-7.5">
    <div>
      <h3 class="text-xl font-semibold text-black dark:text-white">{{ title }}</h3>
    </div>

    <div class="mb-2">
      <div id="donutChart" class="mx-auto flex justify-center">
        <VueApexCharts
          type="donut"
          width="340"
          :options="apexOptions"
          :series="series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{
  title: string
  series: number[]
  labels: string[]
  colors: string[]
}>()

const apexOptions = ref({
  chart: {
    type: 'donut',
    fontFamily: 'Outfit, sans-serif',
  },
  colors: props.colors,
  labels: props.labels,
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: 'Outfit, sans-serif',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    theme: 'light',
    fillSeriesColor: false,
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 250
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

watch(() => props.colors, (newColors) => {
  apexOptions.value = {
    ...apexOptions.value,
    colors: newColors
  }
}, { deep: true })

watch(() => props.labels, (newLabels) => {
  apexOptions.value = {
    ...apexOptions.value,
    labels: newLabels
  }
}, { deep: true })
</script>
