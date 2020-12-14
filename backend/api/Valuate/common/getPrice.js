import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'

const findSimilar = async (req,res,next) => {
    const {similar,valuate} = req
    let {floor:userFloor} = valuate
    if(similar.length>=5){
        similar.sort((a,b)=>a.unitPrice-b.unitPrice)
        similar.pop()
        similar.shift()
    }
    let pricePerFloor = 1.005
    if(userFloor===undefined) {
        pricePerFloor = 1
        userFloor = 1
    }
    const avgPrice = Math.round(
        similar.reduce((accumulator, {unitPrice,detail})=>{
            //calculate avgPrice
            let floor = 1
            try{floor = detail.floor.floor}catch{}
            console.log(floor,unitPrice)
            return accumulator+unitPrice/Math.pow(pricePerFloor,floor)
        },0)
        *Math.pow(pricePerFloor,userFloor)
        /similar.length
    )
    console.log('avg',avgPrice)
    valuate.similar = similar.map(({_id})=>_id)
    valuate.avgPrice = avgPrice
    await valuate.save()
        .catch(dbCatch)
    res.send({similar,avgPrice})
}

export default asyncHandler(findSimilar)