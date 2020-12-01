const asyncHandler = require('express-async-handler')
const Valuate = require('../../../model/Valuate')
const { ErrorHandler } = require('../../error')

const findSimilar = async (req,res,next) => {
    const {similar,valuate} = req
    console.log('len',similar.length)
    const avgPrice = Math.round(similar.reduce((accumulator, {unitPrice})=>accumulator+unitPrice,0)/similar.length)
    console.log('avg',avgPrice)
    valuate.similar = similar.map(({_id})=>_id)
    valuate.avgPrice = avgPrice
    // valuate.save()
    //     .catch(e=>{
    //         console.log(e.message)
    //         throw new ErrorHandler(500,'資料庫發生錯誤')
    //     })
    res.send({similar,avgPrice})
}

module.exports = asyncHandler(findSimilar)