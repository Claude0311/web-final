const express = require("express")
const { handleError,ErrorHandler } = require("../error")
const router = express.Router()

router.get('/getHouses',require('./getHouses'))
router.get('/getHouse',require('./getHouse'))
router.use(handleError)

module.exports = router