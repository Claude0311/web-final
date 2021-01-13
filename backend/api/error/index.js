class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.msg = message;
    }
}

const handleError = (err,req,res,next) => {
    const { statusCode, msg } = err
    if(!msg){
        console.log(err)
        return res.status(404).json({
            msg:'unknow error'
        })
    }
    console.log('my Error',msg)
    res.status(statusCode).json({
        status: "error",
        statusCode,
        msg
    })
}

/**
 * throw Error 500 '資料庫錯誤' to error router
 * @param {Error} e
 */
const dbCatch = (e) => {
    console.error(e)
    throw new ErrorHandler(500,'資料庫錯誤')
}

export {ErrorHandler, handleError, dbCatch}

export const validErr = (fieldName='unput')=>{
    return (val)=>{
        try{
            return JSON.parse(val)
        }
        catch{
            throw new ErrorHandler(`${fieldName} should be Object like`)
        }
    }
}