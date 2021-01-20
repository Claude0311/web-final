import mongoose from 'mongoose'
const Schema = mongoose.Schema

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

export default mongoose.model('House_detail_fake2', House_detail)
