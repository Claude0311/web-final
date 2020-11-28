const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async (req,res,next) => {
    const {id} = req.query.hi
    console.log(id)
    const house = await House
        .findOne({id})
        .populate('detail')
        .catch(e=>{throw new ErrorHandler(500,'查詢發生錯誤')})
    console.log(house)
    res.status(200).send(house)
})