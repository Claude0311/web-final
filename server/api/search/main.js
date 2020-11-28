const express = require("express")
const router = express.Router()

router.post('/getNear',require('./getNear'))

module.exports = router