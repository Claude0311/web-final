import Template from "./template"

class Floor extends Template{
    static description(param='X'){return `相差${param}層樓以內`}
    rule(param){
        return (user,db)=>{
            return Math.abs(user.floor-db.detail.floor.floor)<=param
        }
    }
}
export  {Floor}