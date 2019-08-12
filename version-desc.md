## 0.0.1
测试阶段

## 0.0.2
修改部分文档

## 1.0.0
1、添加了demo示例

2、添加了对 echarts 引用的接口

3、添加了自定义 loading 和 no-data 的视图 slot 插槽

4、修改部分文档

## 1.0.1
1、修改文档错误

## 1.0.2
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
