import env from 'dotenv'
env.config()

/**
 * @api {post} /loginAuth loginAuth
 * @apiName setAuth
 * @apiGroup Account 
 * @apidescription 登入管理員
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) -
 */
const setAuth = (req,res,next)=>{
    req.session.auth = true
    res.status(204).end()
}

export {setAuth}