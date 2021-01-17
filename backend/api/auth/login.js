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
    const myHash = await Hash.getHash()
    password = await bcrypt.hash(password,myHash)
    const loginUser = await User.findOne({user,password}).catch(dbCatch)
    if(!loginUser) throw new ErrorHandler(400,'未註冊或密碼錯誤')
    req.session.regenerate(function (err) {
        if(err) throw new ErrorHandler(500,'session錯誤')
        req.session.auth = loginUser.isAuth
        req.session.user = user
        res.status(200).send({user,auth:req.session.auth})
    })
})

import validator from '../middleware/validation'
import {body} from 'express-validator'
const valid = [
    body('user').exists().withMessage('user not given'),
    body('password')
        .exists().withMessage('password not given')
        .isLength({min:2}).withMessage("密碼過短")
        .isLength({max:30}).withMessage('密碼過長')
        .matches(/^\w{2,30}$/).withMessage("密碼誤包含特殊字符")
]

export default [validator(valid),login]
export {login}