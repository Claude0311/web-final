import express, { Router } from 'express'

const router = express.Router()

/**
 * @api {get} /apiKey apiKey
 * @apiName apiKey
 * @apiGroup GeoCode
 * @apidescription return apiKey for geocode
 * 
 * @apiSuccess (200) {String} - apiKey
 */
router.get('/apiKey',(req,res,next)=>{
    res.send('AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0')
})

export default router