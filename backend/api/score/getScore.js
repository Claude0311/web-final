import { ErrorHandler, dbCatch } from '../error'
import asyncHandler from 'express-async-handler'
import scoreTemplate from '../../model/scoreTemplate'
import Score from '../../model/Score'

/**
 * @api {get} /score getScore
 * @apiName GetScore
 * @apiGroup ScoreRule
 * @apiDescription 獲取評分模板和當前規則，description規則：{prefix,postfix}，用prefix+param+postfix呈現，param是update時要回傳給後端的東東
 *
 * 
 * @apiSuccess {Object[]} templates 評分模板(目前有5種)
 * @apiSuccess {Object} templates.1 成交日期
 * @apiSuccess {String} templates.1.className Time
 * @apiSuccess {Object} templates.1.description `近X個月內`
 * @apiSuccess {Object} templates.2 距離
 * @apiSuccess {String} templates.2.className Distance
 * @apiSuccess {Object} templates.2.description `距離X公尺內`
 * @apiSuccess {Object} templates.3 成交日期
 * @apiSuccess {String} templates.3.className Age
 * @apiSuccess {Object} templates.3.description `屋齡差距X年以內`
 * @apiSuccess {Object} templates.4 成交日期
 * @apiSuccess {String} templates.4.className Floor
 * @apiSuccess {Object} templates.4.description `相差X層樓以內`
 * @apiSuccess {Object} templates.5 成交日期
 * @apiSuccess {String} templates.5.className IsFirstFloor
 * @apiSuccess {Object} templates.5.description {prefix:'一樓和一樓比較，二樓以上和二樓以上比較'}
 * @apiSuccess {Object[]} myRules 自訂規則
 * @apiSuccess {Number} myRules.param description中的X
 * @apiSuccess {Object} myRules.description {prefix,postfix}
 * @apiSuccess {Number} myRules.priority 優先度
 * @apiSuccess {String} myRules.className template名稱(update時回傳)
 * 
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const getScore = async (req,res,next)=>{
    const templates = Object.entries(scoreTemplate).map(([key,{description}])=>{
        return {
            className: key,
            description
        }
    })
    const myRules = (await Score.find().catch(dbCatch)).map(({param,description,priority,className})=>{
        console.log({param,description,priority,className})
        return {param,description,priority,className}
    })

    res.status(200).send({templates,myRules})
}

export default asyncHandler(getScore)