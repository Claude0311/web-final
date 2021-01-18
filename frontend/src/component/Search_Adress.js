import NodeGeocoder from 'node-geocoder'
// import Cor from '../model/Coordinate.js'

const options = {
  provider: 'google',
  apiKey: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
}
 
const geocoder = NodeGeocoder(options)

/**
 * 
 * @param {String} address 地址
 * @return {Object} {lat,lng} 
 */
const getCor = async (address)=>{
    try {
        const [{latitude:lat,longitude:lng},..._] = await geocoder.geocode(address);
        return {lat,lng}
    } catch(e) {
        console.log("error");
        return null;
    }
    
    // console.log(middleAdd(address))
}

// getCor('永和區雙和街7巷1~30號')

export default getCor