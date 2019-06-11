import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import jsend from 'jsend'
import { queryHandler, bodyHandler, mongoHandler, errorHandler } from '../error-handler'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(jsend.middleware)
  app.use(apiRoot, routes)
  app.use(queryHandler())
  app.use(bodyHandler())
  app.use(mongoHandler())
  app.use(errorHandler())

  return app
}
