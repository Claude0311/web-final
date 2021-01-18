import axios from 'axios'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'/api':'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})
const dbCatch = e=>console.log('myError:',e?.response?.data?.msg)


export const axiosGetApi = async () => {
    try {
        return await instance.get('/apiKey');
    } catch (e) {
        console.log("fail",e);
        return '';
    }
}

export const axiosGetCoor = async (address) => {
    try {
        console.log(address);
        const {data: coor} = await instance.get('/geoCode',{params:{address}});
        console.log(coor);
        return coor;
    } catch (e) {
        dbCatch(e);
        return null;
    }
}
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
        console.log("get houses", params)
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
        console.log("fail to get /valuate/user");
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
        console.log("fail to get /valuate/auth");
        return null;
    }
}

// ============ Valuate ==========

export const axiosSetManualPrice = async ({_id, manualPrice}) => {
    try {
        console.log("axios set manual price");
        await instance.patch('/valuate/auth',{_id, manualPrice});
        return true;
    } catch (e) {
        console.log("error when set manual price")
        console.log(e);
        return false;
    }
}

// ============ score ============

export const axiosGetScoreRule = async () => {
    try {
        console.log("axios get score");
        const {data: rule} = await instance.get('/score');
        return rule;
    } catch (e) {
        console.log("fail to get /score");
        return null;
    }
}

// ============ test =============
export const init = async () => {
    const dbCatch = e=>{
        console.log('myError:',e?.response?.data?.msg)
        return {data:{}}
    }
    // const {data:{user,auth}} = await instance.post('/login',{user:'b07901029',password:'123'}).catch(dbCatch)
    // console.log(user,auth)
    // const {data:jif} = await instance.get('/valuate/user',{params:{neighbor:{center:{lat:25,lng:121.5},distance:800}}}).catch(dbCatch)
    // // jif.forEach(async ({_id})=>{
    //     const {data:col} = await instance.delete('/valuate/user',{data:{_id:jif[3]._id}}).catch(dbCatch) 
    //     console.log(col)
    // // })
}

export const testErr = async () => {
    instance.get('/error')
        .catch((err) => {
            throw err;
        })
}