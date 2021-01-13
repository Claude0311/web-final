import asyncHandler from 'express-async-handler'
import { dbCatch } from '../../error'

const floorFac = (userFloor,dbFloor)=>{
    if(isNaN(userFloor) || userFloor===-1
       || isNaN(dbFloor) || dbFloor===-1 ) return 1
    return 1 + 0.005 * (userFloor-dbFloor)
}
const ageFac = (userAge,dbAge) => {
    if(isNaN(dbAge) || isNaN(userAge)) return 1
    const ageDiff = userAge-dbAge
    if(Math.abs(ageDiff)<10) return 1 - 0.02*ageDiff
    if(ageDiff>0) return 0.8
    if(ageDiff<0) return 1.2
    return 1
}
const buildingFac = (userBuild,dbBuild,unitPrice)=>{
    if(isNaN(userBuild) || isNaN(dbBuild) || userBuild===dbBuild) return 1
    const buildMix = [userBuild,dbBuild]
    if(buildMix===[1,2]) return (unitPrice-40000)/unitPrice
    if(buildMix===[2,1]) return (unitPrice+40000)/unitPrice
    if(buildMix===[0,1]) return 0.75
    if(buildMix===[1,0]) return 1.25
    return 1
}
const findSimilar = async (req,res,next) => {
    const {similar,valuate} = req
    const {floor:userFloor,age:userAge,biuldingType:userBuild} = valuate
    if(similar.length>=5){
        similar.sort((a,b)=>a.unitPrice-b.unitPrice)
        similar.pop()
        similar.shift()
    }
    const avgPrice = Math.round(
        similar.reduce((accumulator, {biuldingType:dbBuild,unitPrice,detail})=>{
            const dbFloor = detail?.floor?.floor
            const dbAge = detail?.age
            console.log(dbFloor,unitPrice)
            return accumulator + unitPrice * floorFac(userFloor,dbFloor) * ageFac(userAge,dbAge) * buildingFac(userBuild,dbBuild,unitPrice)
        },0)
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