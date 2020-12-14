import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'

import House from '../../../model/House'
import House_detail from '../../../model/House_detail'
import Valuate from '../../../model/Valuate'

const findNear = async (req,res,next) => {
    const {coordinate:{lat,lng},buildingType,floor,age} = req.valuate
    // let scoreInput = {age}
    console.log(lat,lng,buildingType,age,floor)
    // let nears = await House
    //     .find({
    //         buildingType,
    //         'coordinate.lat':{$gt:lat-0.0044916,$lt:lat+0.0044916},
    //         'coordinate.lng':{$gt:lng-0.0049559,$lt:lng+0.0049559}
    //     }).populate('detail')
    //     .catch(dbCatch)
    // console.log(nears.length)
    // if(nears.length<5){
        const nears = await House
            .find({
                buildingType,
                'coordinate.lat':{$gt:lat-0.0044916*2,$lt:lat+0.0044916*2},
                'coordinate.lng':{$gt:lng-0.0049559*2,$lt:lng+0.0049559*2}
            }).populate('detail')
            .catch(dbCatch)
        const scoreInput = {age,lat,lng,floor}
    // }
    req.nears = nears
    req.scoreInput = scoreInput
    next()
}

export default asyncHandler(findNear)