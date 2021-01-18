import express from 'express'
import user from './user'

const router = express.Router()

router.delete('/user',user)

export default router