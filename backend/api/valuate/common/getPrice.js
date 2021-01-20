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
    if(Math.abs(ageDiff)<10) return 1 - 0.01*ageDiff
    if(ageDiff>0) return 0.9
    if(ageDiff<0) return 1.1
    return 1
}
const buildingFac = (userBuild,dbBuild,price)=>{
    if(isNaN(userBuild) || isNaN(dbBuild) || userBuild===dbBuild) return price
    if(userBuild===1 && dbBuild===2) return price-40000
    if(userBuild===2 && dbBuild===1) return price+40000
    if(userBuild===0 && dbBuild===1) return price*0.75
    if(userBuild===1 && dbBuild===0) return price/0.75
    if(userBuild===0 && dbBuild===2) return (price-40000)*0.75
    if(userBuild===2 && dbBuild===0) return price/0.75+40000
    return price
}
const findSimilar = async (req,res,next) => {
    const {similar:similar_temp,valuate} = req
    const {floor:userFloor,age:userAge,buildingType:userBuild} = valuate
    //normalize unitPrice by some rules
    let similar = similar_temp.map(({unitPrice,buildingType:dbBuild,detail,_doc})=>{
        const dbFloor = detail?.floor?.floor
        const dbAge = detail?.age
        let price = unitPrice
        price *= floorFac(userFloor,dbFloor)
        price = buildingFac(userBuild,dbBuild,price)
        price *= ageFac(userAge,dbAge)
        return {..._doc,price}
    })
    //rm extreme case
    if(similar.length>100) similar = similar.sort(()=>0.5-Math.random()).slice(0,100)
    similar.sort((a,b)=>a.price-b.price)
    similar = similar.slice(
        Math.floor(0.2*similar.length),
        Math.ceil(0.8*similar.length)
    )
    //cal avg
    const avgPrice = Math.round(
        similar.reduce((accumulator, {price})=>{
            return accumulator + price
        },0)/similar.length
    )
    // console.log('each',similar.map(({price})=>(price)))
    console.log('avg',avgPrice)
    //save data
    valuate.similar = similar.map(({_id})=>_id)
    valuate.avgPrice = avgPrice
    await valuate.save()
        .catch(dbCatch)
    res.send({similar:similar.map(({price,...props})=>props),avgPrice})
}

export default asyncHandler(findSimilar)