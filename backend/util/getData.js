import axios from 'axios'
import * as CSV from 'csv-string';
import getCor from './getCoordinate'
import houseType from './houseType';

const url1 = "https://plvr.land.moi.gov.tw/Download?fileName=F_lvr_land_A.csv"
const url2 = "https://plvr.land.moi.gov.tw/DownloadSeason?season=109S4&fileName=F_lvr_land_A.csv"
const url3 = "https://sample-videos.com/csv/Sample-Spreadsheet-10-rows.csv"

const c2n = (chin)=>{
  let floor = 0 
  chin = chin.replace('層','')
  const mapping = ['','一','二','三','四','五','六','七','八','九']
  if(chin.includes('十')){
      let [tens,dig] = (chin.split('十')).map(num=>mapping.indexOf(num))
      if(tens===-1||dig===-1) return -1
      floor += tens===0?10:tens*10
      floor += dig
      return floor
  }
  else{
      return mapping.indexOf(chin)
  }
}

const crawHouses = async ()=>{
    const {data} = await axios.get(url1)//,{responseType: 'blob'})
    const parsedCsv = CSV.parse(data);
    // console.log(parsedCsv[0].map((elem,index)=>(`#${index}: ${elem}`)))
    const houses = await Promise.all(
      parsedCsv.filter((arr)=>(
        arr[0]==='永和區' && 
        arr[1].includes('房地') &&
        houseType.includes(arr[11]) &&
        arr[9].includes('層') && !(arr[9].includes('，')) &&
        !(arr[26].includes('間之交易')) &&
        arr[14]!=='' && arr[7]!=='' &&
        arr[27]!=='' &&
        parseInt(arr[7])>1070000
      )).map(async (arr)=>{
        const address = arr[2].includes(arr[0])? arr[2]: arr[0]+arr[2]
        const coordinate = await getCor( address )
        const totalPrice = parseFloat(arr[21])
        const parkingPrice = parseFloat(arr[25])
        const totalSpace = parseFloat((arr[15]/3.305785).toFixed(2))
        const parkingSpace = parseFloat((arr[24]/3.305785).toFixed(2))
        const unitPrice = Math.round((parkingPrice===0||parkingSpace===0)?
                          totalPrice/totalSpace:
                          (totalPrice-parkingPrice)/(totalSpace-parkingSpace))
        const soldTime = {
          year:parseInt(arr[7].slice(0,-4)),
          month:parseInt(arr[7].slice(-4,-2)),
          day:parseInt(arr[7].slice(-2))
        }
        const buildTime = {
          year:parseInt(arr[14].slice(0,-4)),
          month:parseInt(arr[14].slice(-4,-2)),
          day:parseInt(arr[14].slice(-2))
        }
        const age = (soldTime.year-buildTime.year) + 
                    parseFloat(((soldTime.month-buildTime.month + (soldTime.day-soldTime.day)/30)/12).toFixed(1))
        return {
          overview:{
            id:arr[27],
            buildingType:houseType.indexOf(arr[11]),
            coordinate,
            unitPrice
          },
          detail:{
            soldTime:soldTime.year*100+soldTime.month,
            address,
            price:{
              totalPrice,
              parkingPrice
            },
            space:{
              totalSpace,
              parkingSpace
            },
            floor: {
              floor:c2n(arr[9]),
              maxFloor:c2n(arr[10])
            },
            age,
            hasParking: arr[1].includes('車位')
          }
        }
      })
    )
    return houses
}
export default crawHouses