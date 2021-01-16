import axios from 'axios'
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
    try {
        const {data} = await instance.post('/addAuth', {params: {user,isAuth}});
        return {user:data.user, isAuth: isAuth};
    } catch (err) {
        return null;
    }
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
export const sendHouseInformation = async(lat, lng, buildingType, floor, age) => {
    try {
        const {data: {similar, avgPrice}} = await instance.post('/valuate', {lat, lng, buildingType, floor, age})
        return {similar, avgPrice}
    } catch(err)  {
        console.log("fail to send houseImformation")
        return null;
    }
}
export const axiosGetHouses = async (params) => {
    try {        
        const {data:req_houses} = await instance.get('/houses',{params});
        return req_houses;
    } catch (e) {
        console.log("fail to get houses")
        return null;
    }
    
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
        // console.log("axios get", id);
        const { data: {
            buildingType,
            unitPrice,
            detail } } = await instance.get(`/houses/${id}`,{params:{id}});
        return { buildingType, unitPrice, ...detail};
    } catch (e) {
        console.log("fail to get detail");
        throw e;
    }
}

export const axiosUserGetValuate = async () => {
    try {
        // console.log("axios get valuate");
        const { data : valuate } = await instance.get('/valuate/user');
        // console.log(valuate);
        return valuate;
    } catch (e) {
        console.log("fail");
        return null;
    }
}

export const axiosAdminGetValuate = async () => {
    try {
        console.log("axios get valuate");
        const { data : valuate } = await instance.get('/valuate/auth');
        // console.log(valuate);
        return valuate;
    } catch (e) {
        console.log("fail");
        return null;
    }
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

export const testErr = async () => {
    instance.get('/error')
        .catch((err) => {
            throw err;
        })
}