import express from 'express'
import getHouses from './getHouses'
import getHouse from './getHouse'

const router = express.Router()
router.get('/houses',getHouses)
router.get('/houses/:id',getHouse)

export default router