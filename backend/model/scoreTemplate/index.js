// import {Floor} from './Floor'
// import {IsFirstFloor} from './IsFirstFloor'
// import {Age} from './Age'
// import {Distance} from './Distance'
// import {Time} from './Time'

const scoreTemplate = {
    Floor:{
        description:(param='X')=>{return `相差${param}層樓以內`},
        rule:(param)=>{
            return (user,db)=>{
                return Math.abs(user.floor-db.detail.floor.floor)<=param
            }
        }
    },
    IsFirstFloor:{
        description:()=>'一樓和一樓比較，二樓以上和二樓以上比較',
        rule:(param)=>{
            return (user,db)=>{
                return db.detail.floor.floor !== -1 && !((user.floor===1) ^ (db.detail.floor.floor===1))
            }
        }
    },
    Age:{
        description:(param='X')=>{return `屋齡差距${param}年以內`},
        rule:(param=5)=>{
            return ({age},{detail})=>{
                return Math.abs(age-detail.age)<=param
            }
        }
    },
    Distance:{
        description:(param='X')=>{return `距離${param}公尺內`},
        rule:(param)=>{
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
    },
    Time:{
        description:(param='X')=>{return `近X個月內`},
        rule:(param=6)=>{
            return (_,{detail:{soldTime}})=>{
                const nowTime = new Date()
                nowTime.setMonth(nowTime.getMonth()-param)
                const ago = (nowTime.getFullYear()-1911)*100+nowTime.getMonth()
                return ago<=soldTime
            }
        }
    }
}

export default scoreTemplate//{Floor,IsFirstFloor,Age,Distance,Time}