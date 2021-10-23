const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appSrc = pathResolve('src/frontend')
      return webpackConfig
    }
  }
}
