import User from "../../model/User"
import { ErrorHandler } from "../error"
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Hash from "../../model/Hash"

const register = asyncHandler(async (req,res,next)=>{
    let {user,password} = req.body
    if(!user || !password) throw new ErrorHandler('請填寫帳密')
    const myHash = await Hash.getHash()
    password = await bcrypt.hash(password,myHash)
    await new User({user,password}).save()
    res.status(200).send({user})
})

export {register}