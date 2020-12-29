import express from "express"
const router = express.Router()

import {login} from './login'
import {logout} from './logout'
import {setAuth} from './setAuth'
import addAuth from './addAuth'
import {register} from './register'

router.post('/login',login)
router.post('/logout',logout)
router.post('/logoutAuth',logout)
router.post('/loginAuth',setAuth)
router.post('/register',register)
router.post('/addAuth',addAuth)

export default router
export {fakeAuth} from './fakeAuth'
export {isUser} from './isUser'
export {isAuth} from './isAuth'