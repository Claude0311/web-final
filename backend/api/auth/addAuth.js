import User from "../../model/User"
import { ErrorHandler } from "../error"
import asyncHandler from 'express-async-handler'

import {isAuth} from './isAuth'

/**
 * @api {post} /addAuth 新增/移除管理員
 * @apiName addAuth
 * @apiGroup Account 
 * @apidescription 新增/移除管理員
 * 
 * @apiparam {String} user 用戶名
 * @apiparam {boolean} isAuth true新增/false移除
 * 
 * @apiSuccess (200) {String} user 用戶
 * 
 * @apiError (Server error 500) msg session destroy error
 */
const addAuth = asyncHandler(async (req,res,next)=>{
    const {user,isAuth} = req.body
    await User.updateOne({user},{$set:{isAuth}})
    res.status(200).send({user})
})

export default [isAuth,addAuth]