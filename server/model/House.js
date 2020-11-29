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

module.exports = mongoose.model('House', House)
