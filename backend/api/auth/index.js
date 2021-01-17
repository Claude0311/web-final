import express from "express"
const router_out = express.Router()
const router_auth = express.Router()
import login from './login'
import {logout} from './logout'
import {setAuth} from './setAuth'
import addAuth from './addAuth'
import register from './register'

router_out.post('/login',login)
router_out.post('/logout',logout)
// router.post('/logoutAuth',logout)
// router.post('/loginAuth',setAuth)
router_out.post('/register',register)
router_auth.post('/addAuth',addAuth)

export default router_out
export {router_auth as auth_auth}
export {fakeAuth} from './fakeAuth'
export {isUser} from './isUser'
export {isAuth} from './isAuth'