const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,//编译node_modules里的依赖
  lintOnSave: false,//关闭语法检查
  publicPath: './',//解决打包后路径问题
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  }
})
