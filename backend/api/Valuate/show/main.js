import express from 'express'
import auth from './auth'
import user from './user'
import isAuth from '../../isAuth'
const router = express.Router()

router.get('/user',user)
router.use(isAuth)
router.get('/auth',auth)

export default router