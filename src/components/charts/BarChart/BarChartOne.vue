<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartOne" class="-ml-5 min-w-[650px] xl:min-w-full pl-2">
      <VueApexCharts type="bar" height="180" :options="chartOptions" :series="props.series" />
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
        name: 'Sản phẩm',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Bài viết',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  colors: {
    type: Array as () => string[],
    default: () => ['#465fff', '#00e396'],
  },
})

const chartOptions = ref({
  colors: props.colors,
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  xaxis: {
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
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
    markers: {
      radius: 99,
    },
  },
  yaxis: {
    title: false,
  },
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: 'light',
    x: {
      show: false,
    },
    y: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (val: any) {
        return val.toString()
      },
    },
  },
})
</script>
