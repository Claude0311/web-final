import express from 'express'
import getScore from './getScore'
import reset from './reset'
import updateScore from './updateScore'
const router = express.Router()

router.get('/score',getScore)
router.put('/score',updateScore)
router.post('/score',reset)

export default router