import { ErrorHandler } from "../error"
import express from "express"
const router = express.Router()

const isAuth = (req,res,next)=>{
    const {auth} = req.session
    if(auth||true) next()
    else throw new ErrorHandler(400,'not authorized')
}
const isUser = (req,res,next) => {
    const {user} = req.session
    if(!user) throw new ErrorHandler(404,'not login')
    next()
}

const fakeAuth = (req,res,next)=>{
    req.session.auth = true
    next()
}

/**
 * @api {post} /login login
 * @apiName setUser
 * @apiGroup Account 
 * @apidescription 登入
 * 
 * @apiparam {String} user 用戶名字
 * 
 * @apiSuccess (200) {String} - login success
 * 
 * @apiError (400) {String} msg no user given
 */
const setUser = (req,res,next) => {
    const {user} = req.body
    if(!user) throw new ErrorHandler(400,'no user given')
    req.session.user = user
    res.status(200).send('login success')
}

/**
 * @api {post} /logout logout
 * @apiName unsetUser
 * @apiGroup Account 
 * @apidescription 登出
 * 
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (Server error 500) msg session destroy error
 */
const unsetUser = (req,res,next)=>{
    req.session.destroy(err=>{
        if(err) throw new ErrorHandler(500,'session destroy error')
        res.status(204).end()
    })
}

/**
 * @api {post} /loginAuth loginAuth
 * @apiName setAuth
 * @apiGroup Account 
 * @apidescription 登入管理員
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) -
 */
const setAuth = (req,res,next)=>{
    req.session.auth = true
    res.status(204).end()
}

/**
 * @api {post} /logoutAuth logoutAuth
 * @apiName unsetAuth
 * @apiGroup Account 
 * @apidescription 登出管理員
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) -
 */
const unsetAuth = (req,res,next)=>{
    req.session.auth = false
    res.status(204).end()
}

router.post('/login',setUser)
router.post('/logout',unsetUser)
router.post('/loginAuth',setAuth)
router.post('/logoutAuth',unsetAuth)
export default router
export {fakeAuth,isAuth,isUser}