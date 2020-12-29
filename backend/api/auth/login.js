import { dbCatch, ErrorHandler } from "../error"
import expressAsyncHandler from "express-async-handler"
import User from "../../model/User"
import env from 'dotenv'
env.config()
import bcrypt from 'bcrypt'
import Hash from "../../model/Hash"

/**
 * @api {post} /login login
 * @apiName setUser
 * @apiGroup Account
 * @apidescription 登入，在backend/.env使用USE_AUTH=true以檢查資料庫中是否為管理員
 * 
 * @apiparam {String} user 用戶名字
 * @apiparam {String} password 密碼
 * 
 * @apiSuccess (200) {String} user 用戶名
 * @apiSuccess (200) {boolean} auth 是否是管理員(現階段均回傳false)
 * 
 * @apiError (400) {String} msg no user given
 */
const login = expressAsyncHandler(async (req,res,next) => {
    let {user,password} = req.body
    console.log({user,password})
    if(!user) throw new ErrorHandler(400,'no user given')
    if(process.env.USE_AUTH==="true"){
        if(!password) throw new ErrorHandler(400,'no password given')
        const myHash = await Hash.getHash()
        password = await bcrypt.hash(password,myHash)
        const loginUser = await User.findOne({user,password}).catch(dbCatch)
        if(!loginUser) throw new ErrorHandler(400,'未註冊或密碼錯誤')
        req.session.auth = loginUser.isAuth
    }else{
        req.session.auth = false
    }
    req.session.user = user
    res.status(200).send({user,auth:req.session.auth})
})

export {login}