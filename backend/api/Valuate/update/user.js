import asyncHandler from 'express-async-handler'
import { dbCatch, ErrorHandler } from "../../error"

import Valuate from "../../../model/Valuate"
import findNear from '../common/findNear'
import findSimilar from '../common/findSimilar'
import getPrice from '../common/getPrice'

/**
 * @api {put} /valuate/user 更新房屋內容
 * @apiName SetManualPrice
 * @apiGroup Valuate
 * @apiDescription 更新房屋資訊，重新計算系統估價
 * 
 * @apiparam {String} _id 待估房子的_id
 * @apiparam {Number} lat 緯度(optional)
 * @apiparam {Number} lng 經度(optional)
 * @apiparam {String} buildingType(optional)
 *  - 公寓
 *  - 電梯大樓
 *  - 華夏
 * @apiparam {Number} floor 樓層(optional)
 * @apiparam {Number} age 屋齡(optional) 
 *
 * @apiSuccess {Array} similar array of house that similar to the selected house
 * @apiSuccess {Number} avgPrice suggested price of the selected house
 * 
 * @apiError (User error 404) {Number} statusCode 404
 * @apiError (User error 404) {String} msg 
 *   - 查無此房
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const parse = async (req,res,next) => {
    let {_id,lat,lng,buildingType,floor,age} = req.body
    const valuate = await Valuate.findById(_id).catch(dbCatch)
    if(!valuate) throw new ErrorHandler(404,'查無此房')
    if(valuate.user!==req.session.user && false) throw new ErrorHandler(404,'user not match')
    if(lat!==undefined) valuate.coordinate.lat = parseFloat(lat)
    if(lng!==undefined) valuate.coordinate.lng = parseFloat(lng)
    if(buildingType!==undefined) valuate.buildingType = buildingType
    if(floor!==undefined) valuate.floor = parseInt(floor)
    if(age!==undefined) valuate.age = parseFloat(age)
    valuate.processed = false
    req.valuate = valuate
    next()
}

export default [asyncHandler(parse),findNear,findSimilar,getPrice]