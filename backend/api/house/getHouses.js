import House from '../../model/House'
import { ErrorHandler,dbCatch, validErr } from '../error'
import asyncHandler from 'express-async-handler'
import House_detail from '../../model/House_detail'
import { meter2Lat, meter2Lng } from '../../util/unitTrans'

/**
 * @api {get} /houses?buildType= getHouses
 * @apiName GetHouses
 * @apiGroup House
 * @apiDescription 拿到所有房子的座標、房屋型態、價格(顯示在地圖上)
 * 
 * @apiparam {String} buildingType (optional)
 *   - 公寓(無電梯)
 *   - 大樓(10樓以下有電梯)
 *   - 華夏(11樓以上有電梯)
 * @apiparam {Object} neighbor 搜索附近(optional)
 * @apiparam {Object} neighbor.center 中心
 * @apiparam {Object} neighbor.center.lat 中心緯度
 * @apiparam {Object} neighbor.center.lng 中心經度
 * @apiparam {Object} neighbor.distance 距離(公尺)
 * @apiparam {Object} unitPrice 每坪價格(optional)
 * @apiparam {Number} unitPrice.lb lower bound (optional)
 * @apiparam {Number} unitPrice.ub upper bound (optional)
 * @apiparam {Object} totalPrice 總價(optional)
 * @apiparam {Number} totalPrice.lb lower bound (optional)
 * @apiparam {Number} totalPrice.ub upper bound (optional)
 * @apiparam {Object} space 坪數(optional)
 * @apiparam {Number} space.lb lower bound (optional)
 * @apiparam {Number} space.ub upper bound (optional)
 * @apiparam {Boolean} hasParking 有無車位(optional)
 *
 * @apiSuccess {Object[]} - array of Houses
 * @apiSuccess {String} -.id id from 永慶房屋
 * @apiSuccess {String} -.buildingType 房屋型態
 *   - 公寓(無電梯)
 *   - 電梯大樓(10樓以下有電梯)
 *   - 華夏(11樓以上有電梯)
 * @apiSuccess {Object} -.coordinate 經緯度
 * @apiSuccess {Number} -.coordinate.lat 緯度
 * @apiSuccess {Number} -.coordinate.lng 經度
 * @apiSuccess {Number} -.unitPrice 單位坪數價錢
 * 
 * @apiError (client error 404) {Number} statusCode 404
 * @apiError (client error 404) {String} msg 資料格式錯誤 
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getHouses = async (req,res,next) => {
    const {buildingType,unitPrice,totalPrice,hasParking,space,neighbor} = req.query
    let query = {}
    if(buildingType!==undefined) query = {...query,buildingType}
    if(unitPrice!==undefined){
        const {lb,ub} = unitPrice
        if(lb!==undefined) query.unitPrice = {...query.unitPrice, $gt:lb}
        if(ub!==undefined) query.unitPrice = {...query.unitPrice, $lt:ub}
    }
    if(neighbor!==undefined){
        const {center:{lat,lng},distance} = neighbor
        if(!lat||!lng||!distance) throw new ErrorHandler(404,'資料格式錯誤')
        query = {
            ...query,
            'coordinate.lat':{$gt:lat-meter2Lat*distance,$lt:lat+meter2Lat*distance},
            'coordinate.lng':{$gt:lng-meter2Lng*distance,$lt:lng+meter2Lng*distance}
        }
    }
    let houses
    if(
        totalPrice===undefined && 
        hasParking===undefined && 
        space===undefined
    ){
        houses = await House
            .find(query,{_id:0,id:1,buildingType:1,coordinate:1,unitPrice:1})
            .catch(dbCatch)
    }else{
        houses = await House
            .find(query,{_id:0,id:1,buildingType:1,coordinate:1,unitPrice:1,detail:1})
            .populate('detail')
            .catch(dbCatch)
        houses = houses.filter(({detail:{price:{totalPrice:tp},space:{totalSpace:ts},hasParking:hp}})=>{
            if(totalPrice!==undefined){
                const {lb,ub} = totalPrice
                if(lb!==undefined && lb>tp) return false
                if(ub!==undefined && ub<tp) return false
            }
            if(space!==undefined){
                const {lb,ub} = space
                if(lb!==undefined && lb>ts) return false
                if(ub!==undefined && ub<ts) return false
            }
            if(hasParking!==undefined) return hasParking!==hp
            return true
        })
    }

    res.status(200).send(houses)
}

export default asyncHandler(getHouses)

import {query,checkSchema} from 'express-validator'
const template = (myKey='') => ({
    in: ['query'],
    optional:true,
    customSanitizer: {options:validErr(myKey)},
    custom: {
        options:(value)=>{
            console.log(value)
            const {lb,ub} = value
            if(lb!==undefined && isNaN(lb)
            || ub!==undefined && isNaN(ub)
            ) return false
            return true
        },
        errorMessage: `should be ${myKey}:{lb:Number(optional),ub:Number(optional)}`
    }
})
const valid = [
    query('buildingType')
        .optional()
        .isIn(['公寓','電梯大樓','華夏']).withMessage('building type 應是 [公寓,電梯大樓,華夏]'),
    query('neighbor').optional()
        .customSanitizer(validErr('neighbor'))
        .custom(value=>{
            const {center,distance} = value
            if(!center || isNaN(distance)) return false
            const {lat,lng} = center
            if(isNaN(lat)||isNaN(lng)) return false
            return true
        }).withMessage('neighbor格式: {center:{lat:Number,lng:Number},distance:Number}'),
    checkSchema({
        'unitPrice':template('unitPrice'),
        'totalPrice':template('totalPrice'),
        'space':template('space')
    }),
    query('hasParking').optional().isBoolean().withMessage('hasParking should be boolean')
]
export {valid}