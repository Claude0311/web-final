import { useEffect, useState } from 'react';
import { axiosGetApi, axiosGetCoor } from '../axios/axios';

export const useMapApi = () => {
    const [apiKey, setApiKey ] = useState('');
    // const options = {
    //     provider: 'google',
    //     apiKey: apiKey,//'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0', // for Mapquest, OpenCage, Google Premier
    //     formatter: null // 'gpx', 'string', ...
    //   }
    // const geocoder = NodeGeocoder(options);
    
    const searchAddr = async (address) => {
        if (apiKey.length !== 0) {
            return await axiosGetCoor(address);
        }
    }

    const getApiKey = async() => {
        const {data} = await axiosGetApi();
        // console.log("get key" ,data)
        setApiKey(data);
    }

    useEffect(()=>{
        if (!apiKey || !apiKey.length) {
            getApiKey();
          }
    })

    return { apiKey, searchAddr };
}