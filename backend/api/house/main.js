import express from 'express'
import { handleError,ErrorHandler } from "../error/index.js"
const router = express.Router()

import getHouses from './getHouses.js'
router.get('/getHouses',getHouses)
import getHouse from './getHouse.js'
router.get('/getHouse',getHouse)
router.use(handleError)

export default router