import Valuate from "../../../model/Valuate"

import asyncHandler from 'express-async-handler'
import { dbCatch } from "../../error"

/**
 * @api {patch} /valuate/auth set manual price
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
    const {_id,manualPrice} = req.body
    await Valuate
      .updateOne({_id},{manualPrice,processed:true, unread: true})
      .catch(dbCatch)
    res.status(204).end()
}

import validator from '../../middleware/validation'
import {body} from 'express-validator'
const valid = [
    body('_id').exists().withMessage('_id not given'),
    body('manualPrice').exists().withMessage('manualPrice not given')
]

export default [validator(valid),asyncHandler(update_auth)]
