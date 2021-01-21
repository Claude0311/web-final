import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'

import House from '../../../model/House'
import House_detail from '../../../model/House_detail'
import Valuate from '../../../model/Valuate'
import { meter2Lat, meter2Lng } from '../../../util/unitTrans'
import Score from '../../../model/Score'

const findNear = async (req,res,next) => {
    const {coordinate:{lat,lng},buildingType,floor,age} = req.valuate
    // console.log(lat,lng,buildingType,age,floor)
    const farestDis = await Score.find({className:'Distance'}).sort({priority:1})
    let query = {}
    if(farestDis){
        const dis = farestDis[0].param
        // console.log({dis})
        query = {
            'coordinate.lat':{$gt:lat-meter2Lat*dis,$lt:lat+meter2Lat*dis},
            'coordinate.lng':{$gt:lng-meter2Lng*dis,$lt:lng+meter2Lng*dis}
        }
    }
    let nears = await House
        .find(query).sort({ _id: -1 }).populate('detail') //.limit(100)
        .catch(dbCatch)
    if(nears.length===0){
        console.log('too far', {lat,lng})
        const valuate = req.valuate
        valuate.avgPrice = -1
        valuate.similar = []
        await valuate.save()
        return res.send({similar:[],avgPrice:-1})
    }
    const scoreInput = {age,coordinate:{lat,lng},floor,buildingType}
    req.nears = nears
    req.scoreInput = scoreInput
    next()
}

export default asyncHandler(findNear)