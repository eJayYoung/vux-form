const vuxLoader = require('vux-loader')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? 'vux-form'
  : '/',
  configureWebpack: config => {
    config.entry.app = './public/main.js'
    if (process.env.NODE_ENV === 'development') {
      vuxLoader.merge(config, {
        plugins: ['vux-ui', 'duplicate-style']
      })
    }
  }
}
