import { ErrorHandler } from "../error"

const isUser = (req,res,next) => {
    const user = req.session.user
    console.log('yuser',req.session)
    console.log('user',user)
    // if(!user) throw new ErrorHandler(404,'not login')
    next()
}

export {isUser}