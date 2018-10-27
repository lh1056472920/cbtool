module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '链2345区块链资讯导航_数字货币资讯行情_区块链新闻服务平台',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0'
      },
      {
        name: 'keywords',
        content: '区块链新闻资讯，加密数字货币，数字货币视频教程，数字货币行情，区块链人物，区块链百科，区块链媒体，区块链导航，交易所糖果公告，数字货币大全，lian2345,比特币行情,EOS资讯'
      },
      {
        hid: 'description',
        name: 'description',
        content: '链2345资讯网（lian2345.com），给你最新的区块链数字货币新闻资讯，数字货币教程视频，区块链实时快讯，数字货币糖果公告及行情报价，区块链风云人物介绍，数字货币行业大数据，还有区块链导航，本站致力于为需要了解区块链数字货币提供最好的服务。'
      },
      {
        name:"baidu-site-verification" ,
        content:"dSOT3PiJNE"
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'txt',
        // type: 'image/x-icon',
        href: '/robots.txt'
      }
    ]
  },
  router: {
    middleware: ['visits'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  css: [
    // { src: 'element-ui/lib/theme-chalk/index.css' },
    {
      src: '~/static/css/reset.css'
    },
    {
      src: '~/static/css/main.css'
    },
    {
      src: '~/static/iconfont/iconfont.css'
    },
    // { src: '~/static/iconfont/demo.css' }
  ],
  plugins: [
    // '~/plugins/element-ui'
    // '~/plugins/lazyload.js'
  ],
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', '~/plugins/element-ui'],
    extractCSS: {
      allChunks: true
    },
    entry: ["babel-polyfill", "./app/js"],

    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  render: {

    resourceHints: false,
    },

}
