import express from "express"
const router = express.Router()

import {setUser} from './setUser'
import {unsetUser} from './unsetUser'
import {setAuth} from './setAuth'
import {unsetAuth} from './unsetAuth'
import addAuth from './addAuth'
import {register} from './register'

router.post('/login',setUser)
router.post('/logout',unsetUser)
router.post('/loginAuth',setAuth)
router.post('/logoutAuth',unsetAuth)
router.post('/register',register)
router.post('/addAuth',addAuth)

export default router
export {fakeAuth} from './fakeAuth'
export {isUser} from './isUser'
export {isAuth} from './isAuth'