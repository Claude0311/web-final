const House = require('../../model/House')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /getHouses 獲取所有House基本資訊
 * @apiName GetHouses
 * @apiGroup House
 *
 * @apiSuccess {Array} houses array of Houses
 */
const getHouses = async (req,res,next) => {
    const houses = await House
        .find({},{_id:0,id:1,buildingType:1,coordinate:1,unitPrice:1})
        .catch(e=>{throw new ErrorHandler(500,'查詢失敗')})
    console.log('第0個:',houses[0])
    res.status(200).send(houses)
}

module.exports = asyncHandler(getHouses)