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
 * @apiSuccessExample {json} data
 *   {
 *      templates:[
 *          {className:'Time',description:{prefix:'近',postfix:'個月內'}},
 *          {className:'Distance',description:{prefix:'距離',postfix:'公尺內'}},
 *          {className:'Age',description:{prefix:'屋齡差距',postfix:'年以內'}},
 *          {className:'Floor',description:{prefix:'相差',postfix:'層樓以內'}},
 *          {className:'IsFirstFloor',description:{prefix:'一樓和一樓比較，二樓以上和二樓以上比較'}},
 *      ],
 *      myRules:[
 *          {priority:1,className:'IsFirstFloor',param:undefined,description:{prefix:'一樓和一樓比較，二樓以上和二樓以上比較'}},
            {priority:2,className:'Time',param:24,description:{prefix:'近',postfix:'個月內'}},
            {priority:3,className:'Distance',param:500,description:{prefix:'距離',postfix:'公尺內'}},
            {priority:4,className:'Time',param:6,description:{prefix:'近',postfix:'個月內'}},
            {priority:5,className:'Age',param:5,description:{prefix:'屋齡差距',postfix:'年以內'}},
 *      ]
 *   }
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