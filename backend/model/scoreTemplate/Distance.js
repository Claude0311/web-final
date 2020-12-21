import Template from "./template"

class Distance extends Template{
    static description(param='X'){return `距離${param}公尺內`}
    rule(param){
        return (user,db)=>{
            const {coordinate:{lat,lng}} = user
            const {coordinate:{DBlat,DBlng}} = db
            if(
                ((lat-DBlat)/(meter2Lat*param))**2
                +
                ((lng-DBlng)/(meter2Lng*param))**2
                <1
            ) return true
            else return false
        }
    }
}
export {Distance}