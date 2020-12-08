const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const House_detail = new Schema({
    soldTime: Number,
    address: String,
    price: {
        totalPrice: Number,
        parkingPrice: {type:Number,default:0}
    },
    space: {
        totalSpace: Number,//坪
        parkingSpace: {type:Number,default:0}
    },
    floor: {
        floor: Number,
        maxFloor: Number
    },
    age: Number,
    hasParking: {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('House_detail', House_detail)
