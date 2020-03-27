## Descript

>**Tip: I am a chinese, my english is very bad, I wrote this document with a translation tool. If you ca n’t understand it, please don’t scold me**

[中文文档](./README_zh_CN.md)

echarts-vue-component is a echats chart component customized for Vuex, which is not only easy to use, but also very friendly.

1、Before the option object is not set, we think that you are in the state of loading data. By default, there will be a prompt for data loading. You can overwrite it by adding a slot = "loading";

2、After you set the data through setOption, the loading prompt is automatically hidden, without you having to worry about it at all;

3、When your data is empty, there will be a text prompt with no data temporarily, you can overwrite by adding a slot = "no-data"

4、For the default loading animation and no data prompt, you can also customize the text size and color style by adding props to the component;

5、If you use echarts, you need to manually handle the situation where the window size changes and you need to update it in real time, and echarts-vue-component integrates this into the component, and also does the throttling function processing, and destroys the chart Automatically delete the window listener function. And the component exposes the throttle function interface, which you can use elsewhere;

6、For the case where the chart axis category changes or the chart type changes, the echarts setOption method is problematic (the axis data of the option before the change is still on the chart). If you use echarts-vue-component, Simple resetOption can do it;

7、The component only depends on a plug-in library of echarts. The integrated echarts version is 4.2.1. It also provides an interface to return to echarts. After installing the component, you don't need to install echarts yourself;


**Component Show**

[click here to view the effect](http://liguixing.com/echarts-vue-component/index.html)

<img src="http://www.liguixing.com/wp-content/uploads/2019/08/echarts-vue-component.png" width="800">


## Installation

1. npm

```shell
命令: npm install echarts-vue-component
```

2. yarn

```shell
命令: yarn add echarts-vue-component
```

## Quick start

1. Global use, In main.js:
``` js
import ChartBlock from 'echarts-vue-component'
Vue.use(ChartBlock)
```

2. Used in a single component

``` js
import ChartBlock from 'echarts-vue-component'
export default {
  components: {ChartBlock,...},
  ...
}
```


## Use

### 一、Simple use

```html
<chart-block :option="option"></chart-block>

export default {
  data(){
    return {
      option:{
        ... // Option is the same as the object of setOption when you use echarts
      }
    }
  }
}
```

When using the above method, a watch monitor {deep: true} is added inside the component to listen to options. As soon as the option changes, the chart will be rendered again. If you don`t want the chart to change when changing the option, you can set props auto-update="false" for the component to stop that

```html
<chart-block :option="option" :auto-update="false"></chart-block>
```

**Hint 1：** From the perspective of Vue, the above method is not recommended. see
<a href="http://liguixing.com/archives/1068" target="_blank">如何在vue中优雅的使用echarts</a>

The following usage is recommended

```html
<chart-block ref="chart"></chart-block>

let option = {} // Declare your option object

export default {
  mounted() {
    this.$refs.chart.setOption(option)
  }
}
```

### 二、More API

1. Change the font size and color of the default prompt
```html
<chart-block ref="chartdiy3"
  tip-color="#5793f3"
  :tip-fontsize="18"
  :loading-iconsize="50"></chart-block>
```

2. Custom load animation and empty data prompt
```html
<chart-block ref="chartdiy1">
  <div class="diy-tip" slot="loading">
    <p>wait a moment, data is coming</p>
  </div>
  <div class="diy-tip" slot="no-data">
    <p>there is no data</p>
  </div>
</chart-block>
```
**Hint:** Custom loading and empty prompt styles need to be defined by themselves. If the slot is customized, properties such as text color and font size on the prop no longer work.

3. To reset the chart

If you change the type of echarts chart, such as from a pie chart to a bar chart, or if you have more or less one coordinate axis, it will be a problem to use setOption(option) directly. This is a problem of echarts itself, but we provide a solution. In this case, you only need to use the resetOption() method to solve it
```js
this.$refs.chart.resetOption(option)

// 等同于如下代码
this.$refs.chart.reset()
this.$refs.chart.setOption(option)
```

4. Manually trigger resize
```js
this.$refs.chart.resize()
```

5. Sometimes you might need to use echarts
```js
import { echarts } from 'echarts-vue-component'

// And then use it: echarts.xxx
```

6. The throttle function inside the component changes from the throttle of the Underscore.js, Maybe you need it somewhere else
```js
import { throttle } from 'echarts-vue-component'

// And then use it, eg:
// function fn2()
// let fn1 = throttle(fn2,300)
// window.addEventListener('resize',fn1)
```

7. If your chart already shows the data, but now you need to reissue the request to show a different chart (from a bar chart to a pie chart), you can call the reInit method before the request, which automatically resets the chart and returns to the original loading state. But if you just need to re-request data without changing the chart type, you can simply change the reInit method to setLoading before the requested data.

```js
<chart-block ref="chart"></chart-block>
let option = {} // Declare your option object
export default {
  method:{
    requestData(){
      let chart = this.$refs.chart
      chart.reInit() // change type
      // chart.setLoading() // no change
      axios({}).then((data)=>{
        option.data1 = data.xxx
        option.data2 = data.yyy
        chart.setOption(option)
      })
    }
  },
  mounted() {
    this.$refs.chart.setOption(option)
  }
}
```

>Redisplay the loading animation with setLoading(true) and close the loading state with setLoading(false).
>SetLoading supports a second parameter. If true is passed, the chart will be reinitialized. SetLoading (true,true) will be the same as reInit.


## Feedback

If you encounter problems during the process, please submit issues on github or contact me via WeChat, But what I want to explain is: I am a Chinese and my English is very bad.

<img src="http://liguixing.com/wp-content/uploads/2019/11/%E4%B8%AA%E4%BA%BA%E5%BE%AE%E4%BF%A1.png" width="150">


## Major Release Update Log

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
