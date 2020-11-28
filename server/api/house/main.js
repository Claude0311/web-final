const express = require("express")
const router = express.Router()

router.post('/getHouses',require('./getHouses'))
router.post('/getHouse',require('./getHouse'))
module.exports = router