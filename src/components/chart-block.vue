<template>
  <div class="_chart_el_wrap">
    <div class="_chart_el_wrap" ref="chartEl"></div>
    <div class="_chart_data_tip_wrap" v-show="isNodata">
      <slot name="no-data">
        <div class="_chart_wh_full">
          <div style="width:100%;">
            <p class="_chart_tip_text">该图表暂无数据</p>
          </div>
        </div>
      </slot>
    </div>
    <div class="_chart_data_tip_wrap" v-if="isLoading">
      <slot name="loading">
        <div class="_chart_wh_full">
          <div style="width:100%;">
            <div class="_chart_loading_gif"></div>
            <div class="_chart_tip_text">图表数据加载中</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import '../assets/main.css'
import throttle from '../plugins/throttle'
import echarts from 'echarts'

// 判断option的series的data是否为空
const seriesDataIsNull = function (option) {
  const series = option.series;
  const map = {
    '[object Array]': 'array',
    '[object Object]': 'object'
  };
  const seriesType = map[Object.prototype.toString.call(series)]
  if (seriesType == 'array') { // 只要有一个data的长度不为0，则不为空
    let flag = true
    for (let i = 0; i < series.length; i++) {
      if(!Array.isArray(series[i].data)){
        console.error('series属性的data字段必须为数组')
      }else if (series[i].data.length > 0) {
        flag = false
        break
      }
    }
    return flag
  }
  if (seriesType == 'object') {
    if(!Array.isArray(series.data)){
      console.error('series属性的data字段必须为数组')
    }else{
      return series.data.length == 0
    }
  }
  return false
}

const ChartBlock = {
  name: 'ChartBlock',
  props: {
    option: {
      type: Object,
      default: function () {
        return {}
      }
    },
    autoUpdate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      isNodata: false,
      isLoading: true
    }
  },
  methods: {
    setOption(option) {
      this.isLoading = false
      if (option === null || seriesDataIsNull(option)) {
        this.reset()
        this.isNodata = true
      } else if (this.chart) {
        this.isNodata = false
        this.chart.setOption(option)
      }
    },
    resize() {
      this.chart && this.chart.resize()
    },
    returnChartToParent() {
      this.$emit('chartReady', this.chart)
    },
    init() {
      this.chart = echarts.init(this.$refs.chartEl)
      this.chart.setOption(this.option)
      let _chart = this.chart
      this.chart.__resize = throttle(function () {
        _chart.resize()
      }, 200)
      window.addEventListener('resize', this.chart.__resize)
    },
    reset() {
      let el = this.$refs.chartEl
      el.innerHTML = ''
      el.removeAttribute('_echarts_instance_')
      el.removeAttribute('style')
      this.init()
    },
    resetOption(option) {
      this.reset()
      this.setOption(option)
    }
  },
  watch: {
    option: {
      handler(newValue) {
        if (this.autoUpdate && this.chart) {
          this.chart.setOption(newValue)
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chart.__resize)
  }
}
export default ChartBlock
</script>
