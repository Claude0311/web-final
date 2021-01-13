import express from 'express'
import getScore from './getScore'
import reset from './reset'
import updateScore,{valid} from './updateScore'
import validate from '../middleware/validation'
const router = express.Router()

router.get('/score',getScore)
router.put('/score',validate(valid),updateScore)
router.post('/score',reset)

export default router