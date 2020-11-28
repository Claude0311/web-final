const House = require('../../model/House')
const { ErrorHandler } = require('../error')

module.exports = async (req,res,next) => {
    const houses = await House
        .find({},{_id:0,id:1,buildingType:1,coordinate:1,unitPrice:1})
        .catch(e=>{throw new ErrorHandler(500,'查詢失敗')})
    console.log('第0個:',houses[0])
    res.send(houses)
}