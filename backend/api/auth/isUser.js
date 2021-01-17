import { ErrorHandler } from "../error"
import env from 'dotenv'
env.config()

const isUser = (req,res,next) => {
    const {user} = req.session
    // console.log('yuser',req.session)
    console.log('user:',user)
    // console.log('cookie',req)
    if(!user&&process.env.USE_AUTH==="true") throw new ErrorHandler(404,'not login')
    next()
}

export {isUser}