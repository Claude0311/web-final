const Valuate = require("../../../model/Valuate")

const asyncHandler = require('express-async-handler')
const { dbCatch } = require("../../error")

/**
 * @api {get} /showValu/auth get all uncheck Valuation
 * @apiName ShowValuation_Auth
 * @apiGroup Valuate
 * @apiDescription 顯示所有待估價房屋
 *
 * @apiSuccess {Object[]} - array of valuate
 * @apiSuccess {String} -.coordinate {lat,lng}經緯度
 * 
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const show_auth = async (req,res,next) => {
    const valuates = await Valuate
        .find({processed: false})
        .catch(dbCatch)
    res.status(200).send(valuates)
}

module.exports = asyncHandler(show_auth)