## Descript

echarts-vue-component 是一个为 Vue 定制化的 echats 图表组件，不仅使用方便，而且还很友好。

1、在 option 对象没设置之前，我们认为你是正处于加载数据状态，默认会有一个数据加载中的提示，你可以通过添加一个slot="loading"的slot来覆盖

2、当你通过 setOption 设置了数据过后，加载提示自动隐藏，完全不用你操心

3、当你的数据为空时，会自动有一个暂时没有数据的文字提示，你可以通过添加一个slot="no-data"的slot来覆盖

4、针对默认的加载动画和无数据提示，你也可以通过给组件添加 prop 来自定义文字大小和颜色样式

5、如果你使用 echarts，针对 window 窗口大小发生变化需要实时更新的情况，你需要自己手动处理，
而 echarts-vue-component 把这个已经集成到组件里面了，而且还做了节流函数处理，在图表销毁时自动删除窗口监听函数，完全不用你操心。并且组件暴露节流函数接口，你可在其他地方使用。

6、针对图表坐标轴类目发生变化，或者图表类型发生变化的情况，echarts 的 setOption 方法是有问题的（改变前的 option 的坐标轴数据还在图表上），
而如果使用 echarts-vue-component，一个简单的 resetOption 即可搞定

7、组件只依赖 echarts 一个插件库，集成的 echarts 版本为 4.2.1，组件也提供了返回 echarts 的接口

8、还有更多我们可以做的，正在逐步完善当中，敬请期待...

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

1、修改默认提示的字体大小和颜色
```
<chart-block ref="chartdiy3"
  tip-color="#5793f3"
  :tip-fontsize="18"
  :loading-iconsize="50"></chart-block>
```

2、自定义加载动画和数据为空的提示
```
<chart-block ref="chartdiy1">
  <div class="diy-tip" slot="loading">
    <p>数据正在来的路上，请稍等</p>
  </div>
  <div class="diy-tip" slot="no-data">
    <p>没有数据，给个文字提示一下</p>
  </div>
</chart-block>
```
**注:** 自定义的加载和空提示样式需自己定义，同时如果自定义了 slot，prop 上的文字颜色和字体大小等属性不再起作用

3、重置图表

如果你的 echarts 图表改变了类型，比如从饼图变成柱状图，或者是你多了或者少了一个坐标轴，直接使用 setOption(option) 是会有问题的，
这个是 echarts 自身存在的问题，但我们提供了解决办法，这种情况下，你只需使用 resetOption() 方法即可
```javascript
this.$refs.chart.resetOption(option)

// 等同于如下代码
this.$refs.chart.reset()
this.$refs.chart.setOption(option)
```

4、手动触发 resize
```javascript
this.$refs.chart.resize()
```

5、可能有时候你需要使用到 echarts
```javascript
import { echarts } from 'echarts-vue-component'

// 然后使用它 echarts.xxx
```

6、组件内部的节流函数改自 Underscore.js 的 throttle，可能你有别的地方也需要用到
```javascript
import { throttle } from 'echarts-vue-component'

// 然后使用它 eg
// function fn2()
// let fn1 = throttle(fn2,300)
// window.addEventListener('resize',fn1)
```

7、假如有一个线性图表，已经展示了数据，但当我们切换选项的时候，需要重新发请求，并且展示的图表跟原来不一样（假设为饼图），你可以在请求前调用一下 reInit 方法，该方法会自动重置图表，并回到数据加载状态

8、假如有一个线性图表已经渲染完成，需要重新请求数据（不改变图表类型时），可在请求数据前调用 setLoading 方法进入加载状态。
>setLoading 默认会将 isLoading 设置为 true，重现加载动画，也可以通过调用 setLoading(false) 关闭加载状态。
>setLoading 支持第二个参数，如果传 true，则会重新初始化图表。setLoading(true,true) 效果等同于 reInit。


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

1、文档修改


### 1.0.4

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

### 1.2.0

1、添加了 reInit 和 setLoading 两个方法

### 1.3.0

1、添加了三个 prop 属性：tip-color,tip-fontsize,loading-iconsize，用于自定义默认提示的文字大小和颜色

2、添加了两个 API
