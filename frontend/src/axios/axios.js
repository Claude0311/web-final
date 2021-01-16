import axios from 'axios'
import buildingType from './buildingType'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

// =========== login post ============
export const loginAsNormalUser = async ({Username,Password}) => {
    return instance.post('/login',{user: Username,password:Password})
}

export const loginAsAuth = async () => {
    return instance.post('/loginAuth')
}

// ============ houses =============
export const axiosGetHouses = async () => {
    const {data:req_houses} = await instance.get('/houses');
    return req_houses.map(element=>({...element,buildingType:buildingType[element.buildingType]}));
}
// export const axiosGetHousesWithFilter = async () => {
//     const {data:response} = await instance.get('/houses',{params:{
//         buildingType:'公寓',
//         neighbor:{center:{lat:'27',lng:'121'},distance:30},
//         unitPrice:{lb:500000,ub:600000},
//         hasParking:true
//     }})
//     console.log(response)
//     return response
// }
export const axiosGetDetail = async (id) => {
    const {data:{detail}} = await instance.get(`/houses/${id}`,{params:{id:id}});
    return detail;
}

// ============ test =============
export const init = async () => {
    const dbCatch = e=>{console.log(e?.response?.data?.msg)}
    await instance.post('/login',{user:'b07901029',password:'123'}).catch(dbCatch)
    // await instance.get('/houses',{params:{
    //     // buildingType:'公寓'
    // }}).catch(dbCatch)
    await instance.get('/valuate/user').catch(dbCatch)
}