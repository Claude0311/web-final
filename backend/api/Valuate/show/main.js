import express from 'express'
import auth from './auth.js'
import user from './user.js'

const router = express.Router()

router.get('/user',user)
router.use((req,res,next)=>{
    const {auth} = req.session //是否為管理員
    if(auth!==undefined || true) next()
})
router.get('auth',auth)

export default router