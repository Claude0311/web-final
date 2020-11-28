class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.msg = message;
    }
}

const handleError = (err,req,res,next) => {
    const { statusCode, msg } = err
    console.log(err.message)
    if(!msg) return res.status(404).json({
        msg:'unknow error'
    })
    console.log('my Error',msg)
    res.status(statusCode).json({
        status: "error",
        statusCode,
        msg
    })
}

module.exports = {ErrorHandler,handleError}