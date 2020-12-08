const express = require("express")
const router = express.Router()

router.post('/askPrice',require('./askPrice/main'))

module.exports = router