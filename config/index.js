// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {      // production 环境
    env: require('./prod.env'),      // 使用 config/prod.env.js 中定义的编译环境
    
    index: path.resolve(__dirname, '../dist/index.html'),      // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'),            // 编译输出的静态资源路径
    assetsSubDirectory: 'static',           // 编译输出的二级目录
    assetsPublicPath: './',              // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名

    productionSourceMap: false,          // 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,      // 是否开启 gzip
    productionGzipExtensions: ['js', 'css']     // 需要使用 gzip 压缩的文件扩展名
  },
  dev: {         // dev 环境
    env: require('./dev.env'),       // 使用 config/dev.env.js 中定义的编译环境 开发环境
    port: 8080,                        // 运行测试页面的端口
    assetsSubDirectory: 'static',    // 编译输出的二级目录
    assetsPublicPath: '/',           // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {                    // 需要 proxyTable 代理的接口（可跨域）
      '/douban': {                   //  以'/douban' 开头的接口，全部转发到'https://api.douban/v2'这个域名下面
      target: 'https://api.douban.com/v2',   // this.$http.get('douban/movie/in_theaters') 经过转发，实际的请求地址是'
      changeOrigin: true,                    // https://api.douban/v2/movie/in_theaters 就可以解决跨越问题了
      pathRewrite: {
        '^/douban': '/'
        }
      }
    },                 
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false             // 是否开启 cssSourceMap
  }
}
