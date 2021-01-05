import House from '../../model/House'
import House_detail from '../../model/House_detail'
import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'

/**
 * @api {get} /houses/:id getHouse
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
 * @apiSuccess {Object} coordinate  經緯度
 * @apiSuccess {Number} coordinate.lat 緯度
 * @apiSuccess {Number} coordinate.lng 經度
 * @apiSuccess {Number} unitPrice 每坪房價
 * @apiSuccess {Object} detail house_detail
 * @apiSuccess {Number} detail.soldTime 出售時間10911
 * @apiSuccess {String} detail.addres 地址
 * @apiSuccess {Object} detail.price 價格
 * @apiSuccess {Number} detail.price.totalPrice 總價
 * @apiSuccess {Number} detail.price.parkingPrice 車位價格
 * @apiSuccess {Object} detail.space 坪數
 * @apiSuccess {Number} detail.space.totalSpace 總坪數
 * @apiSuccess {Number} detail.space.parkingSpace 車位坪數
 * @apiSuccess {Object} detail.floor 
 * @apiSuccess {Number} detail.floor.floor 樓層
 * @apiSuccess {Number} detail.floor.maxFloor 房屋總樓層數
 * @apiSuccess {Number} detail.age 屋齡
 * @apiSuccess {Boolean} detail.hasParking 有無車位
 * 
 * @apiError (NotFound 404) {Number} statusCode 404
 * @apiError (NotFound 404) {String} msg 查無此房
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getHouse = async (req,res,next) => {
    const {id} = req.params
    console.log(id)
    const house = await House
        .findOne({id})
        .populate('detail')
        .catch(dbCatch)
    // console.log(house)
    if(!house) throw new ErrorHandler(404,'查無此房')
    res.status(200).send(house)
}

export default asyncHandler(getHouse)

// import {param} from 'express-validator'

// const valid = [
//     param('id').exists()
// ]
// export {valid}