<template>
  <div>
    <h1>{{msg}}</h1>
    <h4>组件默认loading和nodata视图</h4>
    <ul class="chart-block-list clearfix">
      <li class="block">
        <div class="desc">没有设置option时</div>
        <div class="chart-box">
          <chart-block ref="chart1"></chart-block>
        </div>
      </li>
      <li class="block">
        <div class="desc">option数据为空时</div>
        <div class="chart-box">
          <chart-block ref="chart2"></chart-block>
        </div>
      </li>
      <li class="block">
        <div class="desc">正常情况</div>
        <div class="chart-box">
          <chart-block ref="chart3"></chart-block>
        </div>
      </li>
    </ul>
    <h4>自定义loading和nodata视图</h4>
    <ul class="chart-block-list clearfix">
      <li class="block">
        <div class="desc">没有设置option时</div>
        <div class="chart-box">
          <chart-block ref="chartdiy1">
            <div class="diy-tip" slot="loading">
              <p>数据正在来的路上，请稍等</p>
            </div>
          </chart-block>
        </div>
      </li>
      <li class="block">
        <div class="desc">option数据为空时</div>
        <div class="chart-box">
          <chart-block ref="chartdiy2">
            <div class="diy-tip" slot="no-data">
              <p>没有数据，给个文字提示一下</p>
            </div>
          </chart-block>
        </div>
      </li>
      <li class="block">
        <div class="desc">通过prop设置加载提示的大小和颜色</div>
        <div class="chart-box">
          <chart-block ref="chartdiy3"
          tip-color="#5793f3"
          :tip-fontsize="18"
          :loading-iconsize="50"></chart-block>
        </div>
      </li>
    </ul>
    <h4>自动响应窗口宽度和改变图表类型</h4>
    <ul class="chart-block-list clearfix" style="width:80%;min-width:800px;">
      <li class="block" style="width:36%;">
        <div class="desc">自动响应窗口改变</div>
        <div class="chart-box">
          <chart-block ref="chartr1"></chart-block>
        </div>
      </li>
      <li class="block" style="width:36%;">
        <div class="desc">
          更改图表类型
          <button @click="changeChartType">点击测试一下</button>
        </div>
        <div class="chart-box">
          <chart-block ref="chartr2"></chart-block>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ChartBlock from './components/chart-block'
import { echarts, throttle } from './index'

var colors = ['#5793f3', '#d14a61', '#675bba'];
let option = {
  color: colors,
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['2015 降水量', '2016 降水量']
  },
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '降水量  ' + params.value
              + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
          }
        }
      },
      data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '降水量  ' + params.value
              + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
          }
        }
      },
      data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '2015 降水量',
      type: 'line',
      xAxisIndex: 1,
      smooth: true,
      data: []
    },
    {
      name: '2016 降水量',
      type: 'line',
      smooth: true,
      data: []
    }
  ]
}

let option2 = JSON.parse(JSON.stringify(option))
option2.series[0].data = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
option2.series[1].data = [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]

let optionPie = {
  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 274, name: '联盟广告' },
        { value: 235, name: '视频广告' },
        { value: 400, name: '搜索引擎' }
      ].sort(function (a, b) { return a.value - b.value; }),
      roseType: 'radius',
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
}

let throttleFn = throttle(function(){
  console.log('测试throttle')
  console.log(echarts)
},300)

export default {
  components: {
    ChartBlock
  },
  data() {
    return {
      msg: 'echarts-vue-component',
      chartFlag: true
    }
  },
  methods: {
    changeChartType() {
      this.chartFlag = !this.chartFlag
      if (this.chartFlag) {
        this.$refs.chartr2.resetOption(option2)
      } else {
        this.$refs.chartr2.resetOption(optionPie)
      }
    }
  },
  mounted() {
    this.$refs.chart2.setOption(option) // 数据为空的展示
    this.$refs.chart3.setOption(option2) // 有数据时的展示
    this.$refs.chartdiy2.setOption(option)
    this.$refs.chartr1.setOption(option2)
    this.$refs.chartr2.setOption(option2)
    // 测试throttle方法
    window.addEventListener('resize',throttleFn)
  },
  beforeDestroy(){
    window.removeEventListener('resize',throttleFn)
  }
}
</script>

<style>
h1,
h4 {
  font-weight: normal;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clearfix {
  *zoom: 1;
}
.clearfix::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  clear: both;
}

.chart-block-list {
  width: 1200px;
  margin: 0 auto;
}
.chart-block-list .block {
  float: left;
  width: 360px;
  height: 330px;
  padding: 10px;
  margin: 10px;
  background: #eee;
}
.chart-block-list .desc {
  line-height: 30px;
  text-align: center;
}
.chart-block-list .chart-box {
  height: 300px;
}
.diy-tip {
  display: flex;
  height: 100%;
  align-items: center;
}
.diy-tip > p {
  width: 100%;
  text-align: center;
  color: #999;
}
</style>
