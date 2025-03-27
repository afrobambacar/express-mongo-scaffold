import { MongoMemoryReplSet } from 'mongodb-memory-server'
import mongoose from 'services/mongoose'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryReplSet.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
  return Promise.resolve()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany())
  })
  await Promise.all(promises)
  return Promise.resolve()
})
