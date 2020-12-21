import Template from "./template";

class Time extends Template{
    static description(param='X'){return `近X個月內`}
    rule(param=6){
        return (_,{detail:{soldTime}})=>{
            const nowTime = new Date()
            nowTime.setMonth(nowTime.getMonth()-param)
            const ago = (nowTime.getFullYear()-1911)*100+nowTime.getMonth()
            return ago<=soldTime
        }
    }
}
export {Time}