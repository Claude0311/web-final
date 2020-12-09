import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Valuate = new Schema({
    //user related
    user: {type:String,default:'b07901029'},
    //{ type: Schema.Types.ObjectId, ref: 'user' },
    processed: {type:Boolean, default:false},
    //house related
    coordinate: {lat:Number,lng:Number},
    buildingType: String,
    age:Number,
    floor: Number,
    //valuate related
    similar: [{ type: Schema.Types.ObjectId, ref: 'House' }],
    avgPrice: Number,
    manualPrice: Number
})

export default mongoose.model('Valuate', Valuate)
