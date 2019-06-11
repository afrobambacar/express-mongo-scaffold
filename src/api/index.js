import { Router } from 'express'
import image from './image'
import device from './device'
import message from './message'

const router = new Router()

router.use('/images', image)
router.use('/devices', device)
router.use('/messages', message)
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'hello sinsa'
    }
  })
})

export default router
