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
    const {outline,detail} = await Score.mustRule(req.valuate)
    let nears = await House
        .find(outline)
        .populate({
            path:'detail',
            match:detail
        })
        .sort({_id:-1})
        .catch(dbCatch)
    nears = nears.filter(({detail})=>detail!==null)
    // console.log('nears',nears)
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