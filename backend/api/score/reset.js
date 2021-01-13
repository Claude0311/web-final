import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'
import scoreTemplate from '../../model/scoreTemplate'
import Score from '../../model/Score'

/**
 * @api {post} /score resetScore
 * @apiName ResetScore
 * @apiGroup ScoreRule
 * @apiDescription reset預設的score方法(之後看要不要在get時告知內容)
 *   1. 是否是一樓
 *   2. 2年內
 *   3. 500公尺內
 *   4. 半年內
 *   5. 屋齡+-5年
 * 
 * @apiSuccess {Object[]} myRules 預設規則
 * @apiSuccess {Object} myRules.1 {priority:1,className:'IsFirstFloor',description,param:undefined}
 * @apiSuccess {Object} myRules.2 {priority:2,className:'Time',description,param:24}
 * @apiSuccess {Object} myRules.3 {priority:3,className:'Distance',description,param:500}
 * @apiSuccess {Object} myRules.4 {priority:4,className:'Time',description,param:6}
 * @apiSuccess {Object} myRules.5 {priority:5,className:'Age',description,param:5}
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const resetScore = async (req,res,next)=>{
    await Score.deleteMany().catch(dbCatch)
    const rules = [
        {priority:1,className:'IsFirstFloor',param:undefined},
        {priority:2,className:'Time',param:24},
        {priority:3,className:'Distance',param:500},
        {priority:4,className:'Time',param:6},
        {priority:5,className:'Age',param:5},
    ]
    const myRules = (await Score.insertMany(rules).catch(dbCatch)).map(({param,description,priority,className})=>{
        return {param,description,priority,className}
    })
    res.status(200).send({myRules})
}

export default asyncHandler(resetScore)