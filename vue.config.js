const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                        unitPrecision: 3,
                        minPixelValue: 2
                    })
                ]
            }
        }
    },
    devServer: {
        // open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
          '/api': {
            target: 'http://120.53.31.103:84/api/app/',
            ws: true,
            changOrigin: true,  //允许跨域
            pathRewrite: {
              '^/api': ''  //请求的时候使用这个api就可以
            }
          }
        }
      }
}