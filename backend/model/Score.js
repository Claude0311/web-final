import mongoose from 'mongoose'
const Schema = mongoose.Schema
import monFunc from 'mongoose-function'
monFunc(mongoose)

const Score = new Schema({
    priority:{type:Number},
    rule:Function,//function that return 2 input
    des:Function,
    param:Number
})

Score.virtual('scroe').get(function(){
    return this.rule(this.param)
})

Score.virtual('description')
    .get(function(){
        return this.des(this.param)
    })
    .set(function(v){
        this.des = v
    })

export default mongoose.model('Score', Score)
