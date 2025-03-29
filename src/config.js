import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (process.env === 'development' && !process.env[name]) {
    console.log('You must set the ' + name + ' environment variable')
    return ''
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY') || 'masterKey',
    jwtSecret: requireProcessEnv('JWT_SECRET') || 'jwtSecret',
    mongo: {
      uri: requireProcessEnv('MONGO_URI'),
      options: {
        autoIndex: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
      }
    },
    mongooseOptions: {
      debug: false
    }
  },
  test: {},
  development: {
    mongooseOptions: {
      debug: true
    }
  },
  production: {}
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
