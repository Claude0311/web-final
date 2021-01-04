import express from 'express'
import {handleError,ErrorHandler} from './error'

const router = express.Router()


import house from './house/main'
router.use(house)
import valuate from './valuate/main'
router.use(valuate)
import auth from './auth'
router.use(auth)
import score from './score/main'
router.use(score)

router.post('/func',(req,res,_)=>{
    res.send({hey:(()=>{console.log('hello wotld')}).toString(),heo:'jei'})
})

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
router.use(handleError)

export default router