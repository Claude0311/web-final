/**
 * @api {post} /logoutAuth logoutAuth
 * @apiName unsetAuth
 * @apiGroup Account 
 * @apidescription 登出管理員
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) -
 */
const unsetAuth = (req,res,next)=>{
    req.session.auth = false
    res.status(204).end()
}

export {unsetAuth}