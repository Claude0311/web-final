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

 /**
 * @api {post} /logoutAuth logoutAuth
 * @apiName unsetAuth
 * @apiGroup Account 
 * @apidescription 登出管理員，將在未來版本與logout合併，建議直接使用/logout
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (Server error 500) msg session destroy error
 */
const logout = (req,res,next)=>{
    req.session.destroy(err=>{
        if(err) throw new ErrorHandler(500,'session destroy error')
        res.status(204).end()
    })
}

export {logout}