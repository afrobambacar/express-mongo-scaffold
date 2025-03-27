/* eslint no-console: 0 */
import mongoose from 'mongoose'
import { mongooseOptions, env } from 'config'

Object.keys(mongooseOptions).forEach((key) => {
  mongoose.set(key, mongooseOptions[key])
})

/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() }
}

/* istanbul ignore next */
mongoose.connection.on('connected', () => {
  if (env === 'test') return
  console.log(chalk.magenta('mongodb has connected'))
})

/* istanbul ignore next */
mongoose.connection.on('disconnected', () => {
  if (env === 'test') return
  console.log(chalk.magenta('mongodb has disconnected'))
})

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  if (env === 'test') return
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

export default mongoose
