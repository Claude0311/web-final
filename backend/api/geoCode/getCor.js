import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'
import getCoordinate from '../../util/getCoordinate'

/**
 * @api {get} /geoCode get Coordinate
 * @apiName getCor
 * @apiGroup GeoCode
 * @apidescription give address return {lat,lng}
 * 
 * @apiparam {String} address 地址
 * 
 * @apiSuccess (200) {Number} lat 緯度
 * @apiSuccess (200) {Number} lng 經度
 * 
 * @apiError (500) {String} msg 資料庫錯誤
 */
const getCor = async (req,res,next)=>{
    const {address} = req.query
    if(!address || address.length===0) throw new ErrorHandler(404,'address not given')
    const cor = await getCoordinate(address,false).catch(dbCatch)
    res.send(cor)
}

export default asyncHandler(getCor)