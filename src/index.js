require('@babel/register')
require('app-module-path').addPath(__dirname)

exports = module.exports = require('./app')
