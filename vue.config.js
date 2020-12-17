const vuxLoader = require('vux-loader')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development'
  ? 'vux-form'
  : '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.entry.app = './public/main.js'
    }
    vuxLoader.merge(config, {
      plugins: ['vux-ui', 'duplicate-style']
    })
  }
}
