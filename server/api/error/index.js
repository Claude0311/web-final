class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.msg = message;
    }
}

const handleError = (err,req,res,next) => {
    const { statusCode, msg } = err
    console.log('Error',msg)
    res.status(statusCode).json({
        status: "error",
        statusCode,
        msg
    })
}

module.exports = {ErrorHandler,handleError}