const vuxLoader = require('vux-loader')

module.exports = {
  configureWebpack: config => {
    config.entry.app = './public/main.js'
    vuxLoader.merge(config, {
      plugins: ['vux-ui', 'duplicate-style']
    })
  }
}
