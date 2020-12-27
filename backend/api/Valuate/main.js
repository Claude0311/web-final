import express from 'express'
import askPrice from './askPrice/main'
import show from './show/main'
import update from './update/main'
const router = express.Router()

//get /valuate/user,/valuate/auth
router.use('/valuate',show)
//post /valuate
router.post('/valuate',askPrice)
//put
router.use('/valuate',update)

export default router