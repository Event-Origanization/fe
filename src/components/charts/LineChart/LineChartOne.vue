<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
      <VueApexCharts type="area" height="310" :options="chartOptions" :series="props.series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  series: {
    type: Array as () => any[],
    default: () => [
      {
        name: 'Người đăng ký',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  colors: {
    type: Array as () => string[],
    default: () => ['#465FFF'],
  },
})

const chartOptions = ref({
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: props.colors,
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'straight',
    width: [2, 2],
  },
  markers: {
    size: 0,
  },
  labels: {
    show: false,
    position: 'top',
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: 'light',
    x: {
      format: 'dd MMM yyyy',
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
  },
})
</script>

<style scoped>
.area-chart {
  width: 100%;
}
</style>
