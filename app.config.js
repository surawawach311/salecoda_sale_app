const merge = require('deepmerge')

module.exports = () => {
  if (process.env.APP_ENV === 'production') {
    return merge(require('./app.common.json'), require('./app.production.json'))
  } else {
    return merge(require('./app.common.json'), require('./app.development.json'))
  }
}
