import express from 'express'
import {handleError,ErrorHandler} from './error'
import house from './house/main'
import valuate,{valuate_auth} from './valuate/main'
import auth,{auth_auth,isAuth,isUser} from './auth'
import score from './score/main'
import apiKey from './geoCode'

const router = express.Router()

/**
 * @api {get} /error Error testing
 * @apiName Error
 * @apigroup Error
 * @apiDescription 給前端測試error handling
 * 
 * @apiError (NotFound 404) {Number} statusCode 404
 * @apiError (NotFound 404) {String} msg oh no!
 */
router.get('/error', ()=>{
    throw new ErrorHandler(404,'oh no!')
})

router.use(auth)

router.use(isUser)
router.use(valuate)
router.use(house)
router.use(apiKey)

router.use(isAuth)
router.use(score)
router.use(auth_auth)
router.use(valuate_auth)

router.use(handleError)

export default router