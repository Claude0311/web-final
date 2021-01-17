import express from 'express'
import auth from './auth'
import user from './user'

const router_in = express.Router()
const router_auth = express.Router()

router_in.get('/user',user)
router_auth.get('/auth',auth)

export default router_in
export {router_auth as show_auth}