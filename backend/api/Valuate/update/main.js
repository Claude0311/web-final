import express from 'express'
import isAuth from '../../isAuth'
import auth from './auth'
import user from './user'

const router = express.Router()

router.put('/user',user)
router.use(isAuth)
router.put('/auth',auth)

export default router