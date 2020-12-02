const Valuate = require("../../../model/Valuate")

const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

const show_auth = async (req,res,next) => {
    const {user} = req.body
    const valuates = await Valuate
        .find({user})
        .catch(e=>{
            console.log(e.messages)
            throw new ErrorHandler(500,'資料庫錯誤')
        })
    res.status.send(valuates)
}

module.exports = show_auth