import express from 'express'
import { handleError,ErrorHandler } from "../error/index.js"
import getHouses from './getHouses.js'
import getHouse from './getHouse.js'

const router = express.Router()
router.get('/getHouses',getHouses)
router.get('/getHouse',getHouse)

export default router