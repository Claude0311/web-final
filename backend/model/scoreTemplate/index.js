import { meter2Lat, meter2Lng } from "../../util/unitTrans"

const scoreTemplate = {
    Floor:{
        description:{prefix:'相差',postfix:'層樓以內'},
        rule:(param)=>{
            return (user,db)=>{
                if(user.floor===undefined || db.detail.floor.floor === -1) return false
                return Math.abs(user.floor-db.detail.floor.floor)<=param
            }
        }
    },
    IsFirstFloor:{
        description:{prefix:'一樓和一樓比較，二樓以上和二樓以上比較'},
        rule:(param)=>{
            return (user,db)=>{
                if(user.floor===undefined || db.detail.floor.floor === -1) return false
                return !((user.floor===1) ^ (db.detail.floor.floor===1))
            }
        }
    },
    Age:{
        description:{prefix:'屋齡差距',postfix:'年以內'},
        rule:(param=5)=>{
            return ({age},{detail})=>{
                if(age===undefined) return false
                return Math.abs(age-detail.age)<=param
            }
        }
    },
    Distance:{
        description:{prefix:'距離',postfix:'公尺內'},
        rule:(param)=>{
            return (user,db)=>{
                const {coordinate:{lat,lng}} = user
                const {coordinate:{lat:DBlat,lng:DBlng}} = db
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
        description:{prefix:'近',postfix:'個月內'},
        rule:(param=6)=>{
            return (_,{detail:{soldTime}})=>{
                const nowTime = new Date()
                nowTime.setMonth(nowTime.getMonth()-param)
                const ago = (nowTime.getFullYear()-1911)*100+nowTime.getMonth()
                return ago<=soldTime
            }
        }
    },
    buildType:{
        description:{prefix:'同類房屋(公寓、華夏、大樓)'},
        rule:(param)=>{
            return ({buildType:userB},{buildType:dbB})=>{
                return userB===dbB
            }
        }
    }
}

export default scoreTemplate//{Floor,IsFirstFloor,Age,Distance,Time}