import express from 'express'
import askPrice from './askPrice/main.js'
import show from './show/main.js'

const router = express.Router()

router.route('/valuate')
  .get(show)
  .post(askPrice)

export default router