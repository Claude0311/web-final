import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'
import Valuate from '../../../model/Valuate'

const findNear = async (req,res,next) => {
    let {lat,lng,buildingType,floor,age} = req.body
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    if(floor!== undefined) floor = parseInt(floor)
    if(age!==undefined) age = parseFloat(age)
    const valuate = new Valuate({floor,age,buildingType,coordinate:{lat,lng}})
    req.valuate = valuate
    next()
}

export default asyncHandler(findNear)