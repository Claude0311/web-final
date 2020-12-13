import Valuate from "../../../model/Valuate.js"

import asyncHandler from 'express-async-handler'
import { dbCatch } from "../../error/index.js"

/**
 * @api {put} /valuate/auth set manual price
 * @apiName SetManualPrice
 * @apiGroup Valuate
 * @apiDescription 設定人為估價
 * 
 * @apiparam {String} _id 待估房子的_id
 * @apiparam {Number} manualPrice 人為估價
 *
 * @apiSuccess -
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const update_auth = async (req,res,next) => {
    const {id,manualPrice} = req.body
    await Valuate
      .updateOne({id},{manualPrice})
      .catch(dbCatch)
    res.status(204).end()
}

export default asyncHandler(update_auth)