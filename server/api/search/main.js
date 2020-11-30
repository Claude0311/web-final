const express = require("express")
const router = express.Router()

router.post('/askPrice',require('./askPrice'))

module.exports = router