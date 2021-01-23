import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Hash = new Schema({
    id:{type:String,unique:true},
    hash:String
})

/**
 * @returns hash
 */
Hash.statics.getHash = async function(){
    const {hash} = await this.findOne({id:1})
    return hash
}

export {Hash}
export default mongoose.model('hash',Hash)