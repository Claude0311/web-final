import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'
import Score from '../../model/Score'
import scoreTemplate from '../../model/scoreTemplate'

const updateScore = async (req,res,next)=>{
    const {myRules} = req.body
    console.log(myRules)
    await Score.deleteMany()
    myRules.forEach(({className,param,priority})=>{
        const myRule = new scoreTemplate[className](param).save()
        console.log(myRule)
        new Score({...myRule,priority}).save()
    })
    res.end()
}

export default asyncHandler(updateScore)