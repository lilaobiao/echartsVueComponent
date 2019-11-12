## Descript

echarts-vue-component 是一个为 Vue 定制化的 echats 图表组件，不仅使用方便，而且还很友好。

1、在 option 对象没设置之前，我们认为你是正处于加载数据状态，默认会有一个数据加载中的提示，你可以通过添加一个 `slot="loading"` 的插槽来覆盖；

2、当你通过 setOption 设置了数据过后，加载提示自动隐藏，完全不用你操心；

3、当你的数据为空时，会自动有一个暂时没有数据的文字提示，你可以通过添加一个 `slot="no-data"` 的插槽来覆盖；

4、针对默认的加载动画和无数据提示，你也可以通过给组件添加 prop 来自定义文字大小和颜色样式；

5、如果你使用 echarts，针对 window 窗口大小发生变化需要实时更新的情况，你需要自己手动处理，
而 echarts-vue-component 把这个已经集成到组件里面了，而且还做了节流函数处理，在图表销毁时自动删除窗口监听函数，完全不用你操心。并且组件暴露节流函数接口，你可在其他地方使用；

6、针对图表坐标轴类目发生变化，或者图表类型发生变化的情况，echarts 的 setOption 方法是有问题的（改变前的 option 的坐标轴数据还在图表上），而如果使用 echarts-vue-component，一个简单的 resetOption 即可搞定；

7、组件只依赖 echarts 一个插件库，集成的 echarts 版本为 4.2.1，组件也提供了返回 echarts 的接口；

8、还有更多我们可以做的，正在逐步完善当中，敬请期待...

**组件展示**

<img src="http://www.liguixing.com/wp-content/uploads/2019/08/echarts-vue-component.png" width="800">

## Install

1. npm安装

```shell
命令: npm install echarts-vue-component
```

2. yarn安装

```shell
命令: yarn add echarts-vue-component
```

## Import

1. 全局使用，main.js 添加如下代码

``` js
import ChartBlock from 'echarts-vue-component'
Vue.use(ChartBlock)
```

2. 局部使用，在需要引用的vue文件添加如下代码

``` js
import ChartBlock from 'echarts-vue-component'
export default {
  components: {ChartBlock,...},
  ...
}
```


## 使用

### 一、简单的使用

```html
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

```html
<chart-block :option="option" :auto-update="false"></chart-block>
```

**注一：** 从 Vue 的角度考虑，不建议使用上面这种方式。具体见
<a href="http://liguixing.com/archives/1068" target="_blank">如何在vue中优雅的使用echarts</a>

**注二：** 因为 echarts 图表必须要有真实的 dom 元素存在于页面上才能渲染，这是无论如何封装也改变不了的事实，所以 echarts-vue-component 虽然支持通过设置 option 的形式自动渲染，但内部的原理其实还是在 mounted 钩子（即元素渲染完成后）里面手动的调用了一次 setOption 而已。并且，由于 vue 的限制，通过 prop 绑定一个 js 对象的方式必须要做深度数据监听才能感知到数据变化，如下：
```
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
}
```
上面这段代码，会让你的加载状态变得不可控（只要 option 变化，就会调用 setOption 方法，导致你的加载状态变为 false ）。所以，个人还是建议不要使用绑定 option 的方式来使用（除非你的数据是已知的，或者你一次渲染图表后不会再做任何修改）。


推荐下面的使用方式

```html
<chart-block ref="chart"></chart-block>

let option = {} // 声明你的option对象

export default {
  mounted() {
    this.$refs.chart.setOption(option)
  }
}
```

### 二、更多API

1. 修改默认提示的字体大小和颜色
```html
<chart-block ref="chartdiy3"
  tip-color="#5793f3"
  :tip-fontsize="18"
  :loading-iconsize="50"></chart-block>
```

2. 自定义加载动画和数据为空的提示
```html
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

3. 重置图表

如果你的 echarts 图表改变了类型，比如从饼图变成柱状图，或者是你多了或者少了一个坐标轴，直接使用 setOption(option) 是会有问题的，
这个是 echarts 自身存在的问题，但我们提供了解决办法，这种情况下，你只需使用 resetOption() 方法即可
```js
this.$refs.chart.resetOption(option)

// 等同于如下代码
this.$refs.chart.reset()
this.$refs.chart.setOption(option)
```

4. 手动触发 resize
```js
this.$refs.chart.resize()
```

5. 可能有时候你需要使用到 echarts
```js
import { echarts } from 'echarts-vue-component'

// 然后使用它 echarts.xxx
```

6. 组件内部的节流函数改自 Underscore.js 的 throttle，可能你有别的地方也需要用到
```js
import { throttle } from 'echarts-vue-component'

// 然后使用它 eg
// function fn2()
// let fn1 = throttle(fn2,300)
// window.addEventListener('resize',fn1)
```

7. 假如有一个线性图表，已经展示了数据，但当我们切换选项的时候，需要重新发请求，并且展示的图表跟原来不一样（假设为饼图），你可以在请求前调用一下 reInit 方法，该方法会自动重置图表，并回到数据加载状态

8. 假如有一个线性图表已经渲染完成，需要重新请求数据（不改变图表类型时），可在请求数据前调用 setLoading 方法进入加载状态。
>setLoading 默认会将 isLoading 设置为 true，重现加载动画，也可以通过调用 setLoading(false) 关闭加载状态。
>setLoading 支持第二个参数，如果传 true，则会重新初始化图表。setLoading(true,true) 效果等同于 reInit。


## 重大版本更新日志

### 0.0.1

测试阶段

### 0.0.2

修改部分文档

### 1.0.0

1. 添加了demo示例

2. 添加了对 echarts 引用的接口

3. 添加了自定义 loading 和 no-data 的视图 slot 插槽

4. 修改部分文档

### 1.0.1

1. 修改文档错误

### 1.0.2

1. 添加了引用组件内部节流函数的接口

2. 对设置的 option 对象的 series 判断做了友好提示补充

3. 文档补充

### 1.0.3

1. 文档修改

### 1.0.4

1. 删除了测试阶段没有用到的文件

### 1.1.0

1. 更新依赖，webpack 从 3.6.0 升级到 4.39.1

2. 因为 webpack 升级而导致的变更

```js
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

1. 添加了 reInit 和 setLoading 两个方法

### 1.3.0

1. 添加了三个 prop 属性：tip-color（默认'#999'），tip-fontsize（默认14），loading-iconsize（默认30），用于自定义默认提示的文字大小和颜色

### 1.4.1

1. 修改了通过 option 绑定数据时 loadin 图标 未自动隐藏的问题

2. 添加了一个 prop 属性：throttle-time，用于自定义函数节流的时间间隔，默认300
