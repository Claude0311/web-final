import mongoose from 'mongoose'
const Schema = mongoose.Schema
import scoreTemplate from './scoreTemplate'

const Score = new Schema({
    priority:{type:Number,required:true},
    className:{
        type:String,
        enum:Object.keys(scoreTemplate),
        required:true
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

Score.virtual('must').get(function(){
    const mustRule = scoreTemplate[this.className].must
    return mustRule(this.param)//user=>query
})

Score.statics.myRule = async function myRule(){
    let lastPri = 0
    /**
     * 
     * @param {Array} accumulator 
     * @param {Object} currentValue 
     * @param {Number} currentIndex 
     * @param {Array} array 
     */
    const reduce = (accumulator, {priority,score}, currentIndex, array)=>{
        if(lastPri!==priority){
            lastPri = priority
            accumulator.push([score])
            return accumulator
        }else{
            accumulator[accumulator.length-1].push(score)
            return accumulator
        }
    }
    const rules = (await this.find().sort({priority:1})).reduce(reduce,[])
    // console.log({rules})
    return rules
}

Score.statics.mustRule = async function(users){
    /**
     * 
     * @param {Object} accumulator 
     * @param {Object} currentValue 
     * @param {Number} currentIndex 
     * @param {Array} array 
     */
    const reduce = ({outline,detail},{must},currentIndex,array)=>{
        const [boo, que] = must(users)
        if(boo) return {outline:{...outline,...que},detail}
        else return {outline,detail:{...detail,...que}}
    }
    const mustRules = await this.find({priority:1})
    const query = mustRules.reduce(reduce,{outline:{},detail:{}})
    console.log('query',query)
    return query
}

export default mongoose.model('Score', Score)
