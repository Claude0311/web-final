const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Cor = new Schema({
    address: String,
    coordinate: {
        type:{
            lat:Number,
            lng:Number
        },
        require: true
    }
})

module.exports = mongoose.model('Coordinate', Cor)
