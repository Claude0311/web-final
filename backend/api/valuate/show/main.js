import express from 'express'
import auth from './auth'
import user from './user'
import {isAuth} from '../../auth'
const router = express.Router()

router.get('/user',user)
router.get('/auth',isAuth,auth)

export default router