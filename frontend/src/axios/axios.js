import axios from 'axios'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
})

// =========== login post ============
export const loginAsNormalUser = async ({Username,Password}) => {
    try {
        return await instance.post('/login',{user: Username,password:Password});
    } catch (e) {
        console.log(e);
    } finally {
        console.log("login fail");
    }
}

export const loginAsAuth = async () => {
    try {
        return await instance.post('/loginAuth');
    } catch (e) {
        console.log(e);
    } finally {
        console.log("login auth fail");
    }
    
}

// ============ houses =============
export const axiosGetHouses = async () => {
    try {
        const {data:req_houses} = await instance.get('/houses');
        return req_houses;
    } catch (e) {
        console.log("fail to get houses")
    } return null;
    
}
export const axiosGetDetail = async (id) => {
    try {
        const {data:{detail}} = await instance.get(`/houses/${id}`,{params:{id:id}});
        return detail;
    } catch (e) {
        console.log("fail to get detail");
    } return null;
}

// ============ test =============
export const init = async () => {
    const {data:response} = await instance.get('/houses',{params:{
        buildingType:'公寓',
        neighbor:{center:{lat:'27',lng:'121'},distance:30},
        unitPrice:{lb:500000,ub:600000},
        hasParking:true
    }})
    console.log(response)
    return response
}