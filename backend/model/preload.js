import mongoose from 'mongoose'
import {Hash} from './Hash'
import {House_detail} from './House_detail'
import {House} from './House'
import {Score} from './Score'
import {User} from './User'
import {Cor} from './Coordinate'

import env from 'dotenv'
env.config()

const sourceUrl = 'mongodb+srv://ChunFuBank:bankpassword@cluster0.nqvst.mongodb.net/Bank?retryWrites=true&w=majority'
const targetUrl = process.env.MONGO_URI//||'mongodb+srv://ntueeplus:ntueeplus2020@cluster0.gbnte.mongodb.net/EEplus?retryWrites=true&w=majority'
const opt = {useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true}

const main = async (schema) => {
	const sourceDB = await mongoose.createConnection(sourceUrl,opt)
	const targetDB = await mongoose.createConnection(targetUrl,opt)
	const load = async (name,sch,name2)=>{
		if(!name2) name2=name
		const sourceModel = sourceDB.model(name,sch)
		const targetModel = targetDB.model(name2,sch)
		const docs = await sourceModel.find()
		console.log(`${name} doc len ${docs.length}`)
		await targetModel.insertMany(docs).catch(e=>{
			console.log(`skip ${name}`)
		})
	}
	([
		// ['hash',Hash],
		// ['house_fake2',House,'house'],
		// ['house_detail_fake2',House_detail,'house_detail']
		// ['score',Score],
		// ['user',User],
		// ['coordinate',Cor]
	]).forEach(([name,sch,name2])=>{
		load(name,sch,name2)
	})
}

main()