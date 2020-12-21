import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'
import scoreTemplate from '../../model/scoreTemplate'
import Score from '../../model/Score'

const getScore = async (req,res,next)=>{
    const templates = Object.entries(scoreTemplate).map(([key,val])=>{
        return {
            className: key,
            description: val.description.toString()
        }
    })
    const myRules = (await Score.find().catch(dbCatch)).map(({param,des,priority,score})=>{
        console.log(score,des)
        return {param,description:des,priority,score}
    })

    res.status(200).send({templates,myRules})
}

export default asyncHandler(getScore)