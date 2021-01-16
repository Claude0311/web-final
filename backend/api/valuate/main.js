import express from 'express'
import askPrice from './askPrice/main'
import show,{show_auth} from './show/main'
import update,{update_auth} from './update/main'

const router_in = express.Router()
const router_auth = express.Router()

router_in.use('/valuate',show)
router_in.post('/valuate',askPrice)
router_in.use('/valuate',update)

router_auth.use('/valuate',show_auth)
router_auth.use('/valuate',update_auth)

export default router_in
export {router_auth as valuate_auth}