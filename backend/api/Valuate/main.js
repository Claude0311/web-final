import express from "express"
const router = express.Router()

import askPrice from './askPrice/main.js'
router.post('/askPrice',askPrice)
import auth from './show/auth.js'
router.post('/showValu/auth',auth)

export default router