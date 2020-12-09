import express from 'express'
import {handleError,ErrorHandler} from './error/index.js'

const router = express.Router()

import house from './house/main.js'
router.use(house)
import valuate from './valuate/main.js'
router.use(valuate)
router.get('/error', ()=>{
    throw new ErrorHandler(404,'oh no!')
})
router.use(handleError)

export default router