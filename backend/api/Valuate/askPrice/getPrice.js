import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error/index.js'

const findSimilar = async (req,res,next) => {
    const {similar,valuate} = req
    console.log('len',similar.length)
    const avgPrice = Math.round(similar.reduce((accumulator, {unitPrice})=>accumulator+unitPrice,0)/similar.length)
    console.log('avg',avgPrice)
    valuate.similar = similar.map(({_id})=>_id)
    valuate.avgPrice = avgPrice
    valuate.save()
        .catch(dbCatch)
    res.send({similar,avgPrice})
}

export default asyncHandler(findSimilar)