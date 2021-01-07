// import axios from 'axios'
// import {JSDOM} from 'jsdom'
import House from '../model/House'
import House_detail from '../model/House_detail'
// import parseTable from './parseTable'
import getData from './getData'
import DB from '../model/db'


export default async (fromWeb=false)=>{
    const data = await getData()
    console.log('selected data:',data.length)
    data.forEach(async({overview,detail})=>{
        try{
            const house = await new House(overview).save()
                // .catch(e=>{throw new Error()})
            const {_id} = await House_detail(detail).save()
            console.log('accept',_id)
            house.detail = _id
            house.save()
        }catch(e){
            console.log('skip',overview.id)
        }
    })
}