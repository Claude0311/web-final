import { ErrorHandler } from "../error"

const isUser = (req,res,next) => {
    const {user} = req.session
    if(!user) throw new ErrorHandler(404,'not login')
    next()
}

export {isUser}