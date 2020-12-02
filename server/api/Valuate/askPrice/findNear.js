const House = require('../../../model/House')
const House_detail = require('../../../model/House_detail')
const asyncHandler = require('express-async-handler')
const { ErrorHandler } = require('../../error')
const Valuate = require('../../../model/Valuate')

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
        .catch(e=>{
            console.log(e.message)
            throw new ErrorHandler(500,'資料庫發生錯誤')
        })
    // console.log(nears.length)
    if(nears.length<5){
        nears = await House
            .find({
                buildingType,
                'coordinate.lat':{$gt:lat-0.0044916*2,$lt:lat+0.0044916*2},
                'coordinate.lng':{$gt:lng-0.0049559*2,$lt:lng+0.0049559*2}
            }).populate('detail')
            .catch(e=>{
                console.log(e.message)
                throw new ErrorHandler(500,'資料庫發生錯誤')
            })
        scoreInput = {...scoreInput,lat,lng}
    }
    req.nears = nears
    req.scoreInput = scoreInput
    req.valuate = valuate
    next()
}

module.exports = asyncHandler(findNear)