const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const asyncHandler = require('express-async-handler')

const getNear = async (req,res,next) => {
    let {lat,lng} = req.body
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    const nears = await House
        .find({
            'coordinate.lat':{$gt:lat-0.0044916,$lt:lat+0.0044916},
            'coordinate.lng':{$gt:lng-0.0049559,$lt:lng+0.0049559}
        }).populate('detail')
    console.log(nears.length)
    res.send(nears)
}

module.exports = asyncHandler(getNear)