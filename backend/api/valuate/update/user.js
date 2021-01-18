import asyncHandler from 'express-async-handler'
import { dbCatch, ErrorHandler } from "../../error"

import Valuate from "../../../model/Valuate"
import findNear from '../common/findNear'
import findSimilar from '../common/findSimilar'
import getPrice from '../common/getPrice'

/**
 * @api {patch} /valuate/user 更新房屋內容
 * @apiName SetManualPrice
 * @apiGroup Valuate
 * @apiDescription 更新房屋資訊，重新計算系統估價
 * 
 * @apiparam {String} _id 待估房子的_id
 * @apiparam {Number} lat 緯度(optional)
 * @apiparam {Number} lng 經度(optional)
 * @apiparam {Number} buildingType 0~2(optional)
 *  - 0: 公寓(5樓含以下無電梯)
 *  - 1: 華廈(10層含以下有電梯)
 *  - 2: 住宅大樓(11層含以上有電梯)
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

import validator from '../../middleware/validation'
import {body} from 'express-validator'
const valid = [
    body('_id').exists().withMessage('_id is required'),
    body('lat').optional().isNumeric().withMessage('lat should be Number'),
    body('lng').optional().isNumeric().withMessage('lng should be NUmber'),
    body('buildingType').optional().isIn([0,1,2]).withMessage('buildingType should be one of 0~2，stands for 公寓(5樓含以下無電梯)、華廈(10層含以下有電梯)、住宅大樓(11層含以上有電梯)'),
    body('floor').optional().isNumeric().withMessage('floor should be Number(optional)'),
    body('age').optional().isNumeric().withMessage('age should be Number(optinoal)')
]

export default [validator(valid),asyncHandler(parse),findNear,findSimilar,getPrice]