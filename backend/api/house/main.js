import express from 'express'
import getHouses from './getHouses'
import getHouse from './getHouse'

const router = express.Router()
router.get('/houses/:id',getHouse)
router.get('/houses',getHouses)

export default router