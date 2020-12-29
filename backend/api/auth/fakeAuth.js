const fakeAuth = (req,res,next)=>{
    req.session.auth = true
    next()
}

export {fakeAuth}