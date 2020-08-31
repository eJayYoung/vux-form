const vuxLoader = require('vux-loader')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? 'vux-form'
  : '/',
  configureWebpack: config => {
    config.entry.app = './public/main.js'
    vuxLoader.merge(config, {
      plugins: ['vux-ui', 'duplicate-style']
    })
  }
}
