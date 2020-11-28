const NodeGeocoder = require('node-geocoder')
require('../model/db')
const Cor = require('../model/Coordinate')
const options = {
  provider: 'google',
 
  // Optional depending on the providers
//   fetch: customFetchImplementation,
  apiKey: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
}
 
const geocoder = NodeGeocoder(options)

const middleAdd = (address)=>{
  if(!address.includes('~')) return address
  const reg = /[0-9]+~[0-9]+/g
  const [start,end,..._] = address.match(reg)[0].split('~')
  const mid = Math.round((parseInt(start)+parseInt(end))/2)
  return address.replace(reg,mid)
}

const getCor = async (address)=>{
    const doc = await Cor.findOne({address})
    // console.log(doc)
    if(doc) return doc.coordinate
    const [{latitude:lat,longitude:lng},..._] = await geocoder.geocode(middleAdd(address))
    new Cor({
      address,
      coordinate:{lat,lng}
    }).save()
    // console.log({lat,lng})
    return {lat,lng}
    // console.log(middleAdd(address))
}

getCor('永和區雙和街7巷1~30號')

module.exports = getCor