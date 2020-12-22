import express from 'express'
import {isAuth} from '../../auth'
import auth from './auth'
import user from './user'

const router = express.Router()

router.patch('/user',user)
router.patch('/auth',isAuth,auth)

export default router