import Valuate from "../../../model/Valuate"

import asyncHandler from 'express-async-handler'
import { dbCatch, ErrorHandler } from "../../error"

/**
 * @api {delete} /valuate/user delete valuate
 * @apiName deleteValuate
 * @apiGroup Valuate
 * @apiDescription 刪除valuate，注意axios.delete要加{data}
 * 
 * @apiParamExample {js} axios
 *   axios.delete('/houses',{data:{
 *      _id
 *   }})
 * 
 * @apiparam {String} _id _id from get /valuate/user
 * 
 * @apiSuccess (204) {Object[]} - -
 * 
 * @apiError (Client error 404) {Number} statusCode 404
 * @apiError (Client error 404) {String} msg _id not given
 * @apiError (Server error 500) {Number} statusCode 500
 * @apiError (Server error 500) {String} msg 資料庫發生錯誤
 */
const delete_user = async (req,res,next) => {
    let {user} = req.session
    const {_id} = req.body
    // console.log('di',_id)
    if(!_id) throw new ErrorHandler(404,'_id not given')
    await Valuate
        .deleteOne({user,_id})
        .catch(dbCatch)
    res.status(204).send()
}

export default asyncHandler(delete_user)