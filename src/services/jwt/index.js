import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'config'

const jwtSign = promisify(jwt.sign)
const jwtVerify = promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
