import { Router } from 'express'
import auth from './auth'
import user from './user'

const router = new Router()

router.use('/auth', auth)
router.use('/users', user)
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'hello world'
    }
  })
})

export default router
