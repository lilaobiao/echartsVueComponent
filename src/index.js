import ChartBlock from './components/chart-block'
import echart from 'echarts'
import _throttle from './plugins/throttle'

/* 组件注册 */
ChartBlock.install = function (Vue) {
  Vue.component(ChartBlock.name, ChartBlock)
}

export const echarts = echart

export const throttle = _throttle

export default ChartBlock
