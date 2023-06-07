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
  },
   devServer: {
        // port: 8080,//它是用来修改你打开后的端口号的
        // open: true,//值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
        // proxy:{
        //     '/api':{
        //         target:'https://aip.baidubce.com',//跨域请求的公共地址
        //         ws:false, //也可以忽略不写，不写也不会影响跨域
        //         changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
        //         pathRewrite:{
        //             '^/api':''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
        //         }
        //     }
        // },
        headers: {
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
        }
    },
})
