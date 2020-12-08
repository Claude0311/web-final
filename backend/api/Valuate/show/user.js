const Valuate = require("../../../model/Valuate")

const asyncHandler = require('express-async-handler')
const { dbCatch } = require("../../error")

const show_auth = async (req,res,next) => {
    const {user} = req.body
    const valuates = await Valuate
        .find({user})
        .catch(dbCatch)
    res.status(200).send(valuates)
}

module.exports = asyncHandler(show_auth)