import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'

import House from '../../../model/House'
import House_detail from '../../../model/House_detail'
import Valuate from '../../../model/Valuate'
import { meter2Lat, meter2Lng } from '../../../util/unitTrans'

const findNear = async (req,res,next) => {
    const {coordinate:{lat,lng},buildingType,floor,age} = req.valuate
    console.log(lat,lng,buildingType,age,floor)
    const nears = await House
        .find({
            buildingType,
            'coordinate.lat':{$gt:lat-meter2Lat*1000,$lt:lat+meter2Lat*1000},
            'coordinate.lng':{$gt:lng-meter2Lng*1000,$lt:lng+meter2Lng*1000}
        }).sort({ _id: -1 }).limit(100).populate('detail')
        .catch(dbCatch)
    const scoreInput = {age,coordinate:{lat,lng},floor}
    req.nears = nears
    req.scoreInput = scoreInput
    next()
}

export default asyncHandler(findNear)