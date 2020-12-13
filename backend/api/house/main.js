import express from 'express'
import getHouses from './getHouses'
import getHouse from './getHouse'

const router = express.Router()
router.get('/getHouses',getHouses)
router.get('/getHouse',getHouse)

export default router