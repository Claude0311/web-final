import User from "../../model/User"
import { ErrorHandler } from "../error"
import asyncHandler from 'express-async-handler'

import {isAuth} from './isAuth'
const addAuth = asyncHandler(async (req,res,next)=>{
    const {user,isAuth} = req.body
    await User.updateOne({user},{$set:{isAuth}})
    res.status(200).send({user})
})

export default [isAuth,addAuth]