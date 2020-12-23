import mongoose from 'mongoose'
import { meter2Lat, meter2Lng } from '../util/unitTrans'
const Schema = mongoose.Schema

const House = new Schema({
    id: {type:String,unique:true},
    buildingType: String,
    coordinate: {//經緯度與公尺轉換：https://hiking.biji.co/index.php?q=review&act=info&review_id=5989
        lat:Number,//緯度，每0.00001差1.1131955公尺，http://svc.011.idv.tw/CodeHelper/Google/GISApi/index.htm
        lng:Number//經度，每0.00001差1.0089公尺
    },
    unitPrice: Number,
    detail:  { type: Schema.Types.ObjectId, ref: 'House_detail' },
})


House.methods.score = function(user,rules){
  const db = this
  const scoreStr = rules.reduce((accu,rule)=>{
    const numOfTrue = rule.reduce((accu,current)=>{
      isTrue = current(user,db)?1:0
      return accu+isTrue
    },0)
    const putZero = (number,max)=>{
      return number.toString(2).padStart(Math.ceil(Math.log2(max)),'0')
    }
    return accu+putZero(numOfTrue,rule.length+1)
  },'')
  return parseInt(scoreStr,2)
}


export default mongoose.model('House', House)
