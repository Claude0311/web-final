const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const House = new Schema({
    soldTime: String,
    buildingType: String,
    unitPrice: Number,
    floor: {
        floor: Number,
        maxFloor: Number
    },
    age: String,
    parkingSpace: {
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('House', House)
