import env from 'dotenv'
env.config()

/**
 * @api {post} /loginAuth loginAuth
 * @apiName setAuth
 * @apiGroup Account 
 * @apidescription 登入管理員，將來會與/login合併，在backend/.env使用USE_AUTH=true以解鎖此功能
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