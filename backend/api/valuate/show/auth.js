import Valuate from "../../../model/Valuate"

import asyncHandler from 'express-async-handler'
import { dbCatch } from "../../error"

/**
 * @api {get} /valuate/auth get valuations as auth
 * @apiName ShowValuation_Auth
 * @apiGroup Valuate
 * @apiDescription 顯示所有待估價房屋
 *
 * @apiSuccess {Object[]} - array of valuate
 * @apiSuccess {Object} -._id 待估房子的_id，put時回傳
 * @apiSuccess {Object} -.coordinate {lat,lng}經緯度
 * @apiSuccess {String} -.user default b07901029
 * @apiSuccess {Number} -.buildingType 0~2
 *  - 0: 公寓(5樓含以下無電梯)
 *  - 1: 華廈(10層含以下有電梯)
 *  - 2: 住宅大樓(11層含以上有電梯)
 * @apiSuccess {Number} -.age 屋齡
 * @apiSuccess {Number} -.floor 樓層
 * @apiSuccess {Number} -.avgPrice 系統算出來的$
 * @apiSuccess {Object[]} -.similar 附近相似的房子
 * @apiSuccess {String} -.similar.id id from 永慶房屋
 * @apiSuccess {Number} -.similar.buildingType 房屋型態 0~2
 *  - 0: 公寓(5樓含以下無電梯)
 *  - 1: 華廈(10層含以下有電梯)
 *  - 2: 住宅大樓(11層含以上有電梯)
 * @apiSuccess {Object} -.similar.coordinate 經緯度
 * @apiSuccess {Number} -.similar.coordinate.lat 緯度
 * @apiSuccess {Number} -.similar.coordinate.lng 經度
 * @apiSuccess {Number} -.similar.unitPrice 單位坪數價錢
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const show_auth = async (req,res,next) => {
    const valuates = await Valuate
        .find({processed: false})
        .populate('similar')
        .catch(dbCatch)
    res.status(200).send(valuates)
}

export default asyncHandler(show_auth)