import Valuate from "../../../model/Valuate.js"

import asyncHandler from 'express-async-handler'
import { dbCatch } from "../../error/index.js"

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
 * @apiSuccess -
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const update_auth = async (req,res,next) => {
    // const {id,manualPrice} = req.body
    // await Valuate
    //   .updateOne({id},{manualPrice})
    //   .catch(dbCatch)
    // res.status(204).end()
}

export default asyncHandler(update_auth)