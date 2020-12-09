import House from '../../../model/House.js'
import House_detail from '../../../model/House_detail.js'
import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error/index.js'
import Valuate from '../../../model/Valuate.js'

const findNear = async (req,res,next) => {
    let {lat,lng,buildingType,floor,age} = req.body
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    floor = parseInt(floor)
    age = parseFloat(age)
    const valuate = new Valuate({floor,age,coordinate:{lat,lng}})
    let scoreInput = {floor,age}
    let nears = await House
        .find({
            buildingType,
            'coordinate.lat':{$gt:lat-0.0044916,$lt:lat+0.0044916},
            'coordinate.lng':{$gt:lng-0.0049559,$lt:lng+0.0049559}
        }).populate('detail')
        .catch(dbCatch)
    // console.log(nears.length)
    if(nears.length<5){
        nears = await House
            .find({
                buildingType,
                'coordinate.lat':{$gt:lat-0.0044916*2,$lt:lat+0.0044916*2},
                'coordinate.lng':{$gt:lng-0.0049559*2,$lt:lng+0.0049559*2}
            }).populate('detail')
            .catch(dbCatch)
        scoreInput = {...scoreInput,lat,lng}
    }
    req.nears = nears
    req.scoreInput = scoreInput
    req.valuate = valuate
    next()
}

export default asyncHandler(findNear)