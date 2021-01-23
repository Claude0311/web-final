// import axios from 'axios'
// import {JSDOM} from 'jsdom'
import House from '../model/House'
import House_detail from '../model/House_detail'
// import parseTable from './parseTable'
import getData from './getData'
import DB from '../model/db'


export default async (url,isTai)=>{
    const data = await getData(url,isTai)
    console.log('selected data:',data.length)
    data.forEach(async({overview,detail})=>{
        try{
            if(overview===undefined || detail===undefined) return
            const house = await new House(overview).save()
                // .catch(e=>{throw new Error()})
            const {_id} = await new House_detail(detail).save()
            house.detail = _id
            await house.save()
            console.log('accept',_id)
        }catch(e){
            console.log('skip',overview.id)
        }
    })
}