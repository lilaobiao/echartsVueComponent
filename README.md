## Descript

echarts-vue-component 是一个为 Vue 定制化的 echats 图表组件，不仅使用方便，而且还很友好。

1、在 option 对象没设置之前，我们认为你是正处于加载数据状态，默认会有一个数据加载中的提示，你可以通过添加一个slot="loading"的slot来覆盖

2、当你通过 setOption 设置了数据过后，加载提示自动隐藏，完全不用你操心

3、当你的数据为空时，会自动有一个暂时没有数据的文字提示，你可以通过添加一个slot="no-data"的slot来覆盖

4、如果你使用 echarts，针对 window 窗口大小发生变化需要实时更新的情况，你需要自己手动处理，
而 echarts-vue-component 把这个已经集成到组件里面了，而且还做了节流函数处理，在图表销毁时自动删除窗口监听函数，完全不用你操心。并且组件暴露节流函数接口，你可在其他地方使用。

5、针对图表坐标轴类目发生变化，或者图表类型发生变化的情况，echarts 的 setOption 方法是有问题的（改变前的 option 的坐标轴数据还在图表上），
而如果使用 echarts-vue-component，一个简单的 resetOption 即可搞定

6、组件只依赖 echarts 一个插件库，集成的 echarts 版本为 4.2.1，组件也提供了返回 echarts 的接口

7、还有更多我们可以做的，正在逐步完善当中，敬请期待...

**组件展示**

<img src="http://www.liguixing.com/wp-content/uploads/2019/08/echarts-vue-component.png" width="800">

## Install

1、npm安装

``` bash
命令: npm install echarts-vue-component
```

2、yarn安装

```
命令: yarn add echarts-vue-component
```

## Import

1、全局使用，main.js 添加如下代码

``` javascript
import ChartBlock from 'echarts-vue-component'
Vue.use(ChartBlock)
```

2、局部使用，在需要引用的vue文件添加如下代码

``` javascript
import ChartBlock from 'echarts-vue-component'
export default {
  components: {ChartBlock,...},
  ...
}
```


## 使用

### 一、简单的使用

```
<chart-block :option="option"></chart-block>

export default {
  data(){
    return {
      option:{
        ... // option跟你平时使用echarts时setOption的对象一样
      }
    }
  }
}
```

当使用上面这种方式时，组件内部为 option 添加了一个 { deep: true } 的 watch 监听，只要 option 发生变化，图表就会重新渲染，如果不想 option 对象的改变图表也会改变，可以为组件设置 auto-update="false" 来处理

```
<chart-block :option="option" :auto-update="false"></chart-block>
```

**注:** 从 Vue 的角度考虑，不建议使用上面这种方式。具体见
<a href="http://liguixing.com/archives/1068" target="_blank">如何在vue中优雅的使用echarts</a>


推荐下面的使用方式

```javascript
<chart-block ref="chart"></chart-block>

let option = {} // 声明你的option对象

export default {
  mounted() {
    this.$refs.chart.setOption(option)
  }
}
```


### 二、更多API

1、重置图表

如果你的 echarts 图表改变了类型，比如从饼图变成柱状图，或者是你多了或者少了一个坐标轴，直接使用 setOption(option) 是会有问题的，
这个是 echarts 自身存在的问题，但我们提供了解决办法，这种情况下，你只需使用 resetOption() 方法即可
```javascript
this.$refs.chart.resetOption(option)

// 等同于如下代码
this.$refs.chart.reset()
this.$refs.chart.setOption(option)
```

2、手动触发 resize
```javascript
this.$refs.chart.resize()
```

3、可能有时候你需要使用到 echarts
```javascript
import { echarts } from 'echarts-vue-component'

// 然后使用它 echarts.xxx
```

4、组件内部的节流函数改自 Underscore.js 的 throttle，可能你有别的地方也需要用到
```javascript
import { throttle } from 'echarts-vue-component'

// 然后使用它 eg
// function fn2()
// let fn1 = throttle(fn2,300)
// window.addEventListener('resize',fn1)
```


## 更新日志


### 0.0.1

测试阶段


### 0.0.2

修改部分文档


### 1.0.0

1、添加了demo示例

2、添加了对 echarts 引用的接口

3、添加了自定义 loading 和 no-data 的视图 slot 插槽

4、修改部分文档


### 1.0.1

1、修改文档错误


### 1.0.2

1、添加了引用组件内部节流函数的接口
2、对设置的 option 对象的 series 判断做了友好提示补充
3、文档补充


### 1.0.3

1、删除了测试阶段没有用到的文件


### 1.1.0

1、更新依赖，webpack 从 3.6.0 升级到 4.39.1

2、因为 webpack 升级而导致的变更

```
// 升级前
"devDependencies": {
  "vue-loader": "^13.0.5",
  "vue-template-compiler": "^2.4.4",
  "webpack": "^3.6.0",
  "webpack-dev-server": "^2.9.1"
}

// 升级后
"devDependencies": {
  "vue-loader": "^15.7.0",
  "vue-template-compiler": "^2.5.21",
  "uglifyjs-webpack-plugin": "^2.2.0",
  "webpack": "^4.39.1",
  "webpack-cli": "^3.3.6",
  "webpack-dev-server": "^3.8.0"
}
```
