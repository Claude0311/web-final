import express from 'express'
import {isAuth} from '../../auth'
import auth from './auth'
import user from './user'

const router = express.Router()

router.put('/user',user)
router.put('/auth',isAuth,auth)

export default router