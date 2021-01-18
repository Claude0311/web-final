import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cron from 'node-cron'
import DB from './model/db.js'
import api from './api/api'
import session from 'express-session'
import connect from 'connect-mongo'
import env from 'dotenv'
import craw from './util/crawler'
import cors from 'cors'

env.config({path:'../.env'})

const app = express()
DB.once('open',()=>{
	console.log('mongoDB connected')

	cron.schedule('0 0 0 1 * *', () => {//每月的1號0時0分0秒執行
		console.log('first')
		craw()
	})
	//post, get時的解碼json type
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	// app.use(function (req, res, next) {
	// 	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')//讓其他port(ex.3000)可以發post
	// 	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Cookie')
	// 	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH')
	// 	res.header('Access-Control-Allow-Credentials', 'true')
	// 	next()
	// })
	app.use(cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
		credentials: true
	}))

	//session
	const MongoStore = connect(session)
	app.use(
		session({
			name: 'house',
			secret: 'fjwngox', // 用来對session id相關的cookie進行簽名，建議128byte亂碼
			store: new MongoStore({mongooseConnection: DB}),
			saveUninitialized: false, //prevent race conditions
			resave: false,
			cookie: {
				maxAge: 60 * 60 * 1000
			}
		})
	)

	app.use(api)
	
	if(process.env.NODE_ENV==='production'){
		console.log('backend env',process.env.NODE_ENV)
		const buildPath = path.join('.', '..', 'frontend','build')
		app.use(express.static(buildPath))
	}

	app.listen(process.env.PORT || 4000,  () => {
		// craw()
		console.log('server connect')
		console.log(`port name: ${process.env.PORT || 4000}`)
	})
})