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
 * @apiparam {String} buildingType 
 *  - 公寓
 *  - 電梯大樓
 *  - 華夏
 * @apiparam {Number} floor 樓層(optional) 
 * @apiparam {Number} age 屋齡(optional) 
 * 
 * @apiSuccess {Array} similar array of house that similar to the selected house
 * @apiSuccess {Number} avgPrice suggested price of the selected house
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
export default [parse,findNear, findSimilar, getPrice]