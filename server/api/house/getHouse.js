const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /getHouse?id= getHouse
 * @apiName GetHouse
 * @apiGroup House
 * @apiDescription 給定id獲得房子的詳細資訊
 *
 * @apiHeader {String} content-type
 *  axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/>
 *  或者'application/json'也行
 * @apiparam {String} id ID from /getHouses
 * 
 * @apiSuccess {String} id ID from永慶網站
 * @apiSuccess {String} buildingType
 *   - 公寓(無電梯)
 *   - 大樓(10樓以下有電梯)
 *   - 華夏(11樓以上有電梯)
 * @apiSuccess {Object} coordinate {lat,lng} 緯度、精度
 * @apiSuccess {Number} unitPrice 每坪房價
 * @apiSuccess {Object} detail house_detail
 * 
 * @apiError (NotFound 404) {Number} statusCode 404
 * @apiError (NotFound 404) {String} msg 查無此房
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getHouse = async (req,res,next) => {
    const {id} = req.query
    console.log(id)
    const house = await House
        .findOne({id})
        .populate('detail')
        .catch(()=>{throw new ErrorHandler(500,'資料庫發生錯誤')})
    // console.log(house)
    if(!house) throw new ErrorHandler(404,'查無此房')
    res.status(200).send(house)
}

module.exports = asyncHandler(getHouse)