const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module.rules.delete('eslint');
    config.resolve.alias
      .set('~', resolve('src/assets'))
  },
}