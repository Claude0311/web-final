import axios from 'axios'
import buildingType from './buildingType'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
})

// =========== login post ============
export const loginAsNormalUser = async ({user,password}) => {
    try {
        return await instance.post('/login',{user, password});
    } catch (e){
        throw e;
    }
    
}

export const loginAsAuth = async () => {
    try {
        return await instance.post('/loginAuth');
    } catch (e) {
        console.log("login auth fail");
        throw e;
    }
    
}

export const addAuth = async (user,isAuth) => {
    await instance.post('/addAuth', {params: {user,isAuth}})
        .then((res) => {
            console.log("successfully");
        })
        .catch((err) => {
            throw err;
        })
}

export const logoutUser = async () => {
    await instance.post('/logout')
        .catch((err) => {
            throw err;
        })
}

export const logoutAuth = async () => {
    instance.post('/logoutAuth')
        .catch((err) => {
            throw err;
        })
}

export const registerUser = async ({user,password}) => {
    try {
        const {data: {user: name}} = await instance.post('/register', {user,password});
        return name;
    } catch (e) {
        console.log("fail to register");
        throw e;
    }
}

// ============ houses =============
<<<<<<< HEAD
export const axiosGetHouses = async (params) => {
    try {        
        const {data:req_houses} = await instance.get('/houses',{params});
        return req_houses;
    } catch (e) {
        console.log("fail to get houses")
        throw e;
    }
    
=======
export const axiosGetHouses = async () => {
    const {data:req_houses} = await instance.get('/houses');
    return req_houses.map(element=>({...element,buildingType:buildingType[element.buildingType]}));
>>>>>>> main
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
    try {
        const {data:{detail}} = await instance.get(`/houses/${id}`,{params:{id:id}});
        return detail;
    } catch (e) {
        console.log("fail to get detail");
        throw new Error("fail to get detail");
    }
}

// ============ test =============
export const init = async () => {
<<<<<<< HEAD
    const {data:response} = await instance.get('/houses',{params:{
        buildingType:'公寓',
        neighbor:{center:{lat:'27',lng:'121'},distance:30},
        unitPrice:{lb:500000,ub:600000},
        hasParking:true
    }})
    console.log(response)
    return response
}

export const testErr = async () => {
    instance.get('/error')
        .catch((err) => {
            throw err;
        })
=======
    // const {data:response} = await instance.get('/houses',{params:{
    //     // buildingType:'公寓'
    // }}).catch(e=>{
    //     console.log(e?.response?.data?.msg)
    // })
    // console.log(response)
    // return response
>>>>>>> main
}