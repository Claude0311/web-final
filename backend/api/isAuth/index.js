export default (req,res,next)=>{
    const {auth} = req.session||{} //是否為管理員
    if(auth!==undefined || true) next()
    else next('router')
}