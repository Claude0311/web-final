import { ErrorHandler } from "../error"
import env from 'dotenv'
env.config()

const isUser = (req,res,next) => {
    const {user} = req.session
    if(!user&&!(process.env.USE_AUTH==="false")) throw new ErrorHandler(404,'not login')
    next()
}

export {isUser}