import express from 'express'
import getHouses,{valid} from './getHouses'
import getHouse from './getHouse'
import validate from '../middleware/validation'

const router = express.Router()
router.get('/houses/:id',getHouse)
router.get('/houses',validate(valid),getHouses)

export default router