const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const asyncHandler = require('express-async-handler')
const { ErrorHandler } = require('../error')

/**
 * @api {post} /getNear getNear
 * @apiName GetNear
 * @apiGroup Near
 *
 * @apiparam {Number} lat 緯度
 * @apiparam {Number} lng 經度
 * @apiparam {Number} buildingType 
 *  -公寓
 *  -電梯大樓
 *  -華夏
 * @apiparam {Number} buildingType 
 * @apiparam {Number} floor(optional) 
 * @apiparam {Number} age(optional) 
 * 
 * @apiSuccess {Array} similar array of house that similar to the selected house
 * @apiSuccess {Number} avgPrice suggested price of the selected house
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getNear = async (req,res,next) => {
    let {lat,lng,buildingType,floor,age} = req.body
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    floor = parseInt(floor)
    age = parseFloat(age)
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
    //找到至少5筆
    let similar = []
    if(nears.length<=5){
        similar = nears
    }else{
        //計算所有score, {score,index}
        const scores = nears.map((near,index)=>({score:near.score(scoreInput),index}))
        scores.sort((a,b)=>b.score-a.score)
        // console.log(scores)
        scores.forEach(({score,index},ind)=>{
            if(score<scores[5].score) return
            similar.push(nears[index])
            // console.log(nears[index].unitPrice)
        })
    }
    console.log('len',similar.length)
    const avgPrice = Math.round(similar.reduce((accumulator, {unitPrice})=>accumulator+unitPrice,0)/similar.length)
    console.log('avg',avgPrice)
    res.send({similar,avgPrice})
}

module.exports = asyncHandler(getNear)