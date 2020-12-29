import axios from 'axios'
import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
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
    return req_houses;
}
export const axiosGetDetail = async (id) => {
    const {data:{detail}} = await instance.get(`/houses/${id}`,{params:{id:id}});
    return detail;
}

