import { ErrorHandler } from "../error"

/**
 * @api {post} /logout logout
 * @apiName unsetUser
 * @apiGroup Account 
 * @apidescription 登出
 * 
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (Server error 500) msg session destroy error
 */
const unsetUser = (req,res,next)=>{
    req.session.destroy(err=>{
        if(err) throw new ErrorHandler(500,'session destroy error')
        res.status(204).end()
    })
}

export {unsetUser}