import findNear from '../common/findNear'
import findSimilar from '../common/findSimilar'
import getPrice from '../common/getPrice'
import parse from './parse'

/**
 * @api {post} /valuate 請求估價
 * @apiName AskPrice
 * @apiGroup Valuate
 * @apiDescription 給定座標和房屋資訊，提供附近相似房子以及預估價錢
 *
 * @apiHeader {String} content-type
 *  axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/>
 *  或者'application/json'也行
 * 
 * @apiparam {Number} lat 緯度
 * @apiparam {Number} lng 經度
 * @apiparam {Number} buildingType 0~2
 *  - 0: 公寓(5樓含以下無電梯)
 *  - 1: 華廈(10層含以下有電梯)
 *  - 2: 住宅大樓(11層含以上有電梯)
 * @apiparam {Number} floor 樓層(optional) 
 * @apiparam {Number} age 屋齡(optional) 
 * 
 * @apiSuccess {Array} similar array of house that similar to the selected house
 * @apiSuccess {Number} avgPrice suggested price of the selected house
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
import validator from '../../middleware/validation'
import {body} from 'express-validator'
const valid = [
    body('lat').isNumeric().withMessage('lat should be Number'),
    body('lng').isNumeric().withMessage('lng should be NUmber'),
    body('buildingType').isIn([0,1,2]).withMessage('buildingType should be one of 0~2，stands for 公寓(5樓含以下無電梯)、華廈(10層含以下有電梯)、住宅大樓(11層含以上有電梯)'),
    body('floor').optional().isNumeric().withMessage('floor should be Number(optional)'),
    body('age').optional().isNumeric().withMessage('age should be Number(optinoal)')
]

export default [validator(valid),parse,findNear, findSimilar, getPrice]
