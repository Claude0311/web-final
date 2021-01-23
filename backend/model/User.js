import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
    user:{type:String,unique:[true,'已有此使用者']},
    password:String,
    isAuth:{type:Boolean,default:false}
})

export {User}
export default mongoose.model('user',User)