<template>
  <div class="_chart_el_wrap">
    <div class="_chart_el_wrap" ref="chartEl"></div>
    <div class="_chart_data_tip_wrap" v-show="isNodata">
      <slot name="no-data">
        <div class="_chart_wh_full">
          <div style="width:100%;">
            <p class="_chart_tip_text" :style="tipStyle">该图表暂无数据</p>
          </div>
        </div>
      </slot>
    </div>
    <div class="_chart_data_tip_wrap" v-if="isLoading">
      <slot name="loading">
        <div class="_chart_wh_full">
          <div style="width:100%;text-align:center;">
            <!-- <div class="_chart_loading_gif"></div> -->
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
              :width="loadingIconsize"
              :height="loadingIconsize"
              :style="svgStyle">
              <path d="M876.864 782.592c3.264 0 6.272-3.2 6.272-6.656 0-3.456-3.008-6.592-6.272-6.592-3.264 0-6.272 3.2-6.272 6.592 0 3.456 3.008 6.656 6.272 6.656z
              m-140.544 153.344c2.304 2.432 5.568 3.84 8.768 3.84a12.16 12.16 0 0 0 8.832-3.84 13.76 13.76 0 0 0 0-18.56 12.224 12.224 0 0 0-8.832-3.84 12.16 12.16 0 0 0-8.768 3.84 13.696 13.696 0 0 0 0 18.56z
              M552.32 1018.24c3.456 3.648 8.32 5.76 13.184 5.76a18.368 18.368 0 0 0 13.184-5.76 20.608 20.608 0 0 0 0-27.968 18.368 18.368 0 0 0-13.184-5.824 18.368 18.368 0 0 0-13.184 5.76 20.608 20.608 0 0 0 0 28.032z
              m-198.336-5.76c4.608 4.8 11.072 7.68 17.6 7.68a24.448 24.448 0 0 0 17.536-7.68 27.456 27.456 0 0 0 0-37.248 24.448 24.448 0 0 0-17.536-7.68 24.448 24.448 0 0 0-17.6 7.68 27.52 27.52 0 0 0 0 37.184z
              m-175.68-91.84c5.76 6.08 13.824 9.6 21.952 9.6a30.592 30.592 0 0 0 22.016-9.6 34.368 34.368 0 0 0 0-46.592 30.592 30.592 0 0 0-22.016-9.6 30.592 30.592 0 0 0-21.952 9.6 34.368 34.368 0 0 0 0 46.592z
              m-121.152-159.36c6.912 7.36 16.64 11.648 26.368 11.648a36.736 36.736 0 0 0 26.432-11.584 41.28 41.28 0 0 0 0-55.936 36.736 36.736 0 0 0-26.432-11.584 36.8 36.8 0 0 0-26.368 11.52 41.28 41.28 0 0 0 0 56z
              M12.736 564.672a42.88 42.88 0 0 0 30.784 13.44 42.88 42.88 0 0 0 30.784-13.44 48.128 48.128 0 0 0 0-65.216 42.88 42.88 0 0 0-30.72-13.44 42.88 42.88 0 0 0-30.848 13.44 48.128 48.128 0 0 0 0 65.216z
              m39.808-195.392a48.96 48.96 0 0 0 35.2 15.36 48.96 48.96 0 0 0 35.2-15.36 54.976 54.976 0 0 0 0-74.56 48.96 48.96 0 0 0-35.2-15.424 48.96 48.96 0 0 0-35.2 15.424 54.976 54.976 0 0 0 0 74.56z
              M168.32 212.48c10.368 11.008 24.96 17.408 39.68 17.408 14.592 0 29.184-6.4 39.552-17.408a61.888 61.888 0 0 0 0-83.84 55.104 55.104 0 0 0-39.616-17.408c-14.656 0-29.248 6.4-39.616 17.408a61.888 61.888 0 0 0 0 83.84z
              M337.344 124.8c11.52 12.16 27.712 19.264 43.968 19.264 16.256 0 32.448-7.04 43.968-19.264a68.672 68.672 0 0 0 0-93.184 61.248 61.248 0 0 0-43.968-19.264 61.248 61.248 0 0 0-43.968 19.264 68.736 68.736 0 0 0 0 93.184z
              m189.632-1.088c12.672 13.44 30.528 21.248 48.448 21.248s35.712-7.808 48.384-21.248a75.584 75.584 0 0 0 0-102.464A67.392 67.392 0 0 0 575.36 0c-17.92 0-35.776 7.808-48.448 21.248a75.584 75.584 0 0 0 0 102.464z
              m173.824 86.592c13.824 14.592 33.28 23.104 52.736 23.104 19.584 0 39.04-8.512 52.8-23.104a82.432 82.432 0 0 0 0-111.744 73.472 73.472 0 0 0-52.8-23.168c-19.52 0-38.912 8.512-52.736 23.168a82.432 82.432 0 0 0 0 111.744z
              m124.032 158.528c14.976 15.872 36.032 25.088 57.216 25.088 21.12 0 42.24-9.216 57.152-25.088a89.344 89.344 0 0 0 0-121.088 79.616 79.616 0 0 0-57.152-25.088c-21.184 0-42.24 9.216-57.216 25.088a89.344 89.344 0 0 0 0 121.088z
              m50.432 204.032c16.128 17.088 38.784 27.008 61.632 27.008 22.784 0 45.44-9.92 61.568-27.008a96.256 96.256 0 0 0 0-130.432 85.76 85.76 0 0 0-61.568-27.072c-22.848 0-45.44 9.984-61.632 27.072a96.192 96.192 0 0 0 0 130.432z">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1.5s"
                  from="0 512 512"
                  to="360 512 512"
                  repeatCount="indefinite" />
              </path>
            </svg>
            <div class="_chart_tip_text" :style="tipStyle">图表数据加载中</div>
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
    },
    tipColor: {
      type: String,
      default: '#999'
    },
    tipFontsize: {
      type: Number,
      default: 14
    },
    loadingIconsize: {
      type: Number,
      default: 30
    },
    throttleTime: {
      type: Number,
      default: 300
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
    setLoading(flag = true, reset = false) {
      if(flag) this.isNodata = false
      this.isLoading = flag
      if(reset) this.reset()
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
      _chart.__resize = throttle(function() {
        _chart.resize()
      }, this.throttleTime)
      window.addEventListener('resize', this.chart.__resize)
    },
    reset() {
      let el = this.$refs.chartEl
      el.innerHTML = ''
      el.removeAttribute('_echarts_instance_')
      el.removeAttribute('style')
      this.init()
    },
    reInit() {
      this.reset()
      this.isLoading = true
      this.isNodata = false
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
          this.setOption(newValue)
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed:{
    svgStyle(){
      return {fill:this.tipColor}
    },
    tipStyle(){
      return {color:this.tipColor,fontSize:this.tipFontsize+'px'}
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
