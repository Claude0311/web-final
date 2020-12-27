import mongoose from 'mongoose'
const Schema = mongoose.Schema

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

export default mongoose.model('Coordinate', Cor)
