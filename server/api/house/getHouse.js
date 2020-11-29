const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const { ErrorHandler } = require('../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /getHouse 獲取房屋詳細資訊
 * @apiName GetHouse
 * @apiGroup House
 *
 * @apiSuccess {String} id ID from永慶網站
 * @apiSuccess {String} buildingType 公寓(無電梯)、大樓(10樓以下有電梯)、華夏(11樓以上有電梯)
 * @apiSuccess {Object} coordinate {lat,lng} 緯度、精度
 * @apiSuccess {Number} unitPrice 每坪房價
 * @apiSuccess {Object} detail house_detail
 * @apiSuccess {Number} detail.soldTime 販賣時間 ex. 10911
 * @apiSuccess {String} detail.address 地址
 * @apiSuccess {Object} detail.price 販賣價格 {totalPrice:Number, parkingPrice:Number}
 * @apiSuccess {Object} detail.space 坪數 {totalSpace:Number, parkingSpace:Number}
 * @apiSuccess {Object} detail.floor
 * @apiSuccess {Number} detail.floor.floor 樓層
 * @apiSuccess {Number} detail.floor.maxFloor 最高樓層
 * @apiSuccess {Number} detail.age 屋齡(年)
 * @apiSuccess {Boolean} detail.hasParking 有無停車位
 * 
 */
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