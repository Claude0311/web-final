import { dbCatch, ErrorHandler } from "../error"
import env from 'dotenv'
import expressAsyncHandler from "express-async-handler"
import User from "../../model/User"
env.config()
import bcrypt from 'bcrypt'
import Hash from "../../model/Hash"

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
const login = expressAsyncHandler(async (req,res,next) => {
    let {user,password} = req.body
    if(!user) throw new ErrorHandler(400,'no user given')
    if(process.env.USE_AUTH){
        const myHash = await Hash.getHash()
        password = await bcrypt.hash(password,myHash)
        const loginUser = await User.findOne({user,password}).catch(dbCatch)
        if(!loginUser) throw new ErrorHandler(400,'未註冊')
        req.session.auth = loginUser.isAuth
    }
    req.session.user = user
    res.status(200).send({user,auth:req.session.auth})
})

export {login}