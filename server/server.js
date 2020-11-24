//server.js
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

//post, get時的解碼json type
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.get('/', (_,res)=>{
    res.send('Hello world')
})

app.listen(process.env.PORT || 4000, function () {
	console.log('server connect')
	console.log('port name: ', process.env.PORT || 4000)
})
