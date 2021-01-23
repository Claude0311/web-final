import mongoose from 'mongoose'
import env from 'dotenv'
env.config()

const DB_URL1 = 'mongodb+srv://ChunFuBank:bankpassword@cluster0.yvvo0.mongodb.net/bank?retryWrites=true&w=majority'
const DB_URL = BD_URL1//process.env.MONGO_URI||DB_URL1
// console.log(`url:${DB_URL}`)

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser',true)
mongoose.connect(DB_URL)

const DB = mongoose.connection

DB.on('disconnected',function(){
    console.log(`disconnected to ${DB_URL}`)
})

DB.on('error',function(err){
    console.log(err)
})

export default DB