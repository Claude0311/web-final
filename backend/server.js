import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cron from 'node-cron'
// import DB from './model/db.js'
import api from './api/api.js'

const app = express()
// DB.once('open',()=>{
	console.log('mongoDB connected')
	
	cron.schedule('0 0 0 1 * *', () => {//每月的1號0時0分0秒執行
		console.log('first')
		import('./util/crawler')()
	})
	//post, get時的解碼json type
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000')//讓其他port(ex.3000)可以發post
		res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
		res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
		res.header('Access-Control-Allow-Credentials', 'true')
		next()
	})
	app.use(api)
	
	app.get('/', (_,res) => {
		res.send('hello world')
	})
	
	app.listen(process.env.PORT || 4000,  () => {
		// require('./util/crawler')(true)
		console.log('server connect')
		console.log(`port name: ${process.env.PORT || 4000}`)
	})
// })