import express from 'express'
import {handleError,ErrorHandler} from './error'

const router = express.Router()

import house from './house/main'
router.use(house)
import valuate from './valuate/main'
router.use(valuate)
router.get('/error', ()=>{
    throw new ErrorHandler(404,'oh no!')
})
router.use(handleError)

export default router