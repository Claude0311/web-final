//api.js 控管後端所有頁面部屬 
const express = require("express")
const router = express.Router()
const {handleError,ErrorHandler} = require('./error')

router.use(require('./house/main'))
router.use(require('./search/main'))
router.get('/error',()=>{
    throw new ErrorHandler(404,'oh no!')
})
router.use(handleError)

module.exports = router