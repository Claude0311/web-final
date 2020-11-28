const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const House = new Schema({
    id: {type:String,unique:true},
    buildingType: String,
    coordinate: {
        lat:Number,
        lng:Number
    },
    unitPrice: Number,
    detail:  { type: Schema.Types.ObjectId, ref: 'House_detail' },
})

module.exports = mongoose.model('House', House)
