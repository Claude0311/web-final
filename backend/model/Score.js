import mongoose from 'mongoose'
const Schema = mongoose.Schema
import scoreTemplate from './scoreTemplate'

const Score = new Schema({
    priority:{type:Number},
    className:{
        type:String,
        enum:Object.keys(scoreTemplate)
    },
    param:Number
})

Score.virtual('score').get(function(){
    const myRule = scoreTemplate[this.className].rule
    return myRule(this.param)
})

Score.virtual('description').get(function(){
    const myDescription = scoreTemplate[this.className].description
    return myDescription
})

export default mongoose.model('Score', Score)
