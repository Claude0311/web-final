import { ErrorHandler } from "../error"
import env from 'dotenv'
env.config()

const isAuth = (req,res,next)=>{
    const {auth} = req.session
    if(auth||(process.env.USE_AUTH==="false")) next()
    else throw new ErrorHandler(400,'not authorized')
}

export {isAuth}