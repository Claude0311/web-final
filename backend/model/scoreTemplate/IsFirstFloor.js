import Template from "./template"

class IsFirstFloor extends Template{
    constructor(props){
        super(props)
        this.prefix = '一樓和一樓比較，二樓以上和二樓以上比較'
    }
    static description(){return '一樓和一樓比較，二樓以上和二樓以上比較'}
    rule(param){
        return (user,db)=>{
            return db.detail.floor.floor !== -1 && !((user.floor===1) ^ (db.detail.floor.floor===1))
        }
    }
}
export {IsFirstFloor}