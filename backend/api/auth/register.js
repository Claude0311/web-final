import User from "../../model/User"
import { ErrorHandler } from "../error"
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Hash from "../../model/Hash"

/**
 * @api {post} /register register
 * @apiName addUser
 * @apiGroup Account 
 * @apidescription 註冊
 * 
 * @apiparam {String} user 用戶
 * @apiparam {String} password 密碼
 * 
 * @apiSuccess {String} user 用戶名
 * 
 * @apiError (Client error 404) msg 請填寫帳密
 * @apiError (Server error 500) msg 資料庫錯誤
 */
const register = asyncHandler(async (req,res,next)=>{
    let {user,password} = req.body
    if(!user || !password) throw new ErrorHandler(404,'請填寫帳密')
    const myHash = await Hash.getHash()
    password = await bcrypt.hash(password,myHash)
    await new User({user,password}).save()
    res.status(200).send({user})
})

export {register}