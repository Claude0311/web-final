const House = require('../../model/House')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /getHouses getHouses
 * @apiName GetHouses
 * @apiGroup House
 *
 * @apiSuccess {Array} houses array of House
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getHouses = async (req,res,next) => {
    const houses = await House
        .find({},{_id:0,id:1,buildingType:1,coordinate:1,unitPrice:1})
        .catch(e=>{throw new ErrorHandler(500,'資料庫發生錯誤')})
    console.log('第0個:',houses[0])
    res.status(200).send(houses)
}

module.exports = asyncHandler(getHouses)