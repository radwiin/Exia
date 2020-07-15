<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="header-wrapper">
      <div>
        <h2>92.6k</h2>
        <span>Subscribers Gained</span>
      </div>
      <span class="icon-container">
        <svg-icon class="icon" icon-class="vue" class-name="vue" />
      </span>
    </div>
    <apex-chart type="line" height="100" :options="chartOptions" :series="series"></apex-chart>
  </el-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'LineCard',
  components: {
    ApexChart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: 'series1',
          data: [30, 40, 34, 51, 42, 109, 100]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false // 关闭工具栏
          },
          sparkline: {
            enabled: true // 启动迷你画模式
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 10,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.35
          }
        },
        colors: ['#1e1e1e'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
          ]
        },
        tooltip: {
          followCursor: true,
          x: {
            show: false
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 21px 21px 0;

  .icon-container {
    padding: 0.75rem;
    margin-bottom: 1rem;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    background: rgba(30, 30, 30, 0.15);

    .icon {
      color: #1e1e1e;
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: 24.36px;
    font-weight: 900;
    margin: 0 0 0.25rem;
    line-height: 1.2;
    color: #2c2c2c;
  }

  span {
    color: #626262;
  }
}
</style>
