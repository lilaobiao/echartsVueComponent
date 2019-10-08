import ChartBlock from './components/chart-block'
import echarts from 'echarts'
import throttle from './plugins/throttle'

/* 组件注册 */
ChartBlock.install = function (Vue) {
  Vue.component(ChartBlock.name, ChartBlock)
}

export {
  echarts,
  throttle
}

export default ChartBlock
