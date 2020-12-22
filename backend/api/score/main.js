import express from 'express'
import getScore from './getScore'
import updateScore from './updateScore'
const router = express.Router()

router.get('/score',getScore)
router.post('/score',updateScore)

export default router