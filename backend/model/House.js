const mongoose = require('mongoose'),
  Schema = mongoose.Schema

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

House.methods.score = function({lat,lng,age,floor}){
  let score = 0b0
  if(lat!==undefined && lng!==undefined){
    //2年內
    const dat2 = new Date()
    dat2.setMonth(dat2.getMonth()-24)
    const sixMonth = (dat2.getFullYear()-1911)*100+dat2.getMonth()
    if(sixMonth<=this.detail.soldTime) score+=1
    score = score<<1
    //500m
    if(
      (
        ((this.coordinate.lat-lat)/0.0044916)**2
        +
        ((this.coordinate.lng-lng)/0.0049559)**2
      )<1
    ) score = score+=1
    score = score<<1
  }
  //半年內
  const dat = new Date()
  dat.setMonth(dat.getMonth()-6)
  const sixMonth = (dat.getFullYear()-1911)*100+dat.getMonth()
  if(sixMonth<=this.detail.soldTime)score+=1
  score = score<<1
  //屋齡+-5
  if(age!==undefined && Math.abs(age-this.detail.age)<=5) score+=1
  score = score<<1
  //樓層+-1
  if(floor!==undefined && Math.abs(floor-this.detail.floor.floor)<=1) score+=1
  return score
}


module.exports = mongoose.model('House', House)
