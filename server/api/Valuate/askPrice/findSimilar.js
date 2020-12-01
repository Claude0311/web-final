const House = require('../../../model/House')
const House_detail = require('../../../model/House_detail')
const asyncHandler = require('express-async-handler')
const { ErrorHandler } = require('../../error')

const findSimilar = async (req,res,next) => {
    const {nears,scoreInput} = req
    if(nears.length<=5){
        req.similar = nears
    }else{
        const similar = []
        //計算所有score, {score,index}
        const scores = nears.map((near,index)=>({score:near.score(scoreInput),index}))
        scores.sort((a,b)=>b.score-a.score)
        // console.log(scores)
        scores.forEach(({score,index},ind)=>{
            if(score<scores[5].score) return
            similar.push(nears[index])
            // console.log(nears[index].unitPrice)
        })
        req.similar = similar
    }
    next()
}

module.exports = asyncHandler(findSimilar)