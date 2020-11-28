const House = require('../../model/House')
const House_detail = require('../../model/House_detail')
const { ErrorHandler } = require('../error')

module.exports = async (req,res,next) => {
    const {id} = req.body
    console.log(id)
    const house = await House
        .findOne({id})
        .populate('detail')
        .catch(e=>{throw new ErrorHandler(500,'查詢發生錯誤')})
    console.log(house)
    res.send(house)
}