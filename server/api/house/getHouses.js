const House = require('../../model/House')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /getHouses getHouses
 * @apiName GetHouses
 * @apiGroup House
 * @apiDescription 拿到所有房子的座標、房屋型態、價格(顯示在地圖上)
 *
 * @apiSuccess {Object[]} - array of Houses
 * @apiSuccess {String} -.id id from 永慶房屋
 * @apiSuccess {String} -.buildingType 房屋型態
 *   - 公寓(無電梯)
 *   - 大樓(10樓以下有電梯)
 *   - 華夏(11樓以上有電梯)
 * @apiSuccess {Object} -.coordinate 經緯度
 * @apiSuccess {Number} -.coordinate.lat 緯度
 * @apiSuccess {Number} -.coordinate.lng 經度
 * @apiSuccess {Number} -.unitPrice 單位坪數價錢
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