import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Hash = new Schema({
    id:{type:String,unique:true},
    hash:String
})

/**
 * @returns hash
 */
Hash.static.getHash = async function(){
    const {hash} = await this.find({id:1})
    return hash
}

export default mongoose.model('hash',Hash)