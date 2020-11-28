const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

const getHouse = async (req,res,next) => {
    const {id} = req.query
    console.log(id)
    const house = await House
        .findOne({id})
        .populate('detail')
        .catch(()=>{throw new ErrorHandler(500,'查詢發生錯誤')})
    // console.log(house)
    if(!house) throw new ErrorHandler(401,'查無此房')
    res.status(200).send(house)
}

module.exports = asyncHandler(getHouse)