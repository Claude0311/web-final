import express from 'express'
import auth from './auth'
import user from './user'

const router_in = express.Router()
const router_auth = express.Router()

router_in.patch('/user',user)
router_auth.patch('/auth',auth)

export default router_in
export {router_auth as update_auth}