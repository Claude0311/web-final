import asyncHandler from 'express-async-handler'
import Score from '../../../model/Score'
import { dbCatch } from '../../error'

const findSimilar = async (req,res,next) => {
    const {nears,scoreInput} = req
    if(nears.length<=5){
        req.similar = nears
    }else{
        const similar = []
        const rules = await Score.myRule().catch(dbCatch)
        const scores = nears.map((near,index)=>({score:near.score(scoreInput,rules),index}))
        scores.sort((a,b)=>b.score-a.score)
        scores.forEach(({score,index},ind)=>{
            if(score<scores[5].score) return
            similar.push(nears[index])
            // console.log(nears[index].unitPrice)
        })
        req.similar = similar
    }
    next()
}

export default asyncHandler(findSimilar)