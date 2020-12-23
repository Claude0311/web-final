import { ErrorHandler } from "../error"

const isAuth = (req,res,next)=>{
    const {auth} = req.session
    if(auth||true) next()
    else throw new ErrorHandler(400,'not authorized')
}

export {isAuth}