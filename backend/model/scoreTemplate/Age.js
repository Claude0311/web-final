import Template from "./template"

class Age extends Template{
    rule(param=5){
        return ({age},{detail})=>{
            return Math.abs(age-detail.age)<=param
        }
    }
    static description(param='X'){return `屋齡差距${param}年以內`}
}
export {Age}