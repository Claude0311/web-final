import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
import { init } from '../axios/axios'
const Post = () => {
    const [response,setResponse] = useState('connecting bakend')
    useEffect(()=>{
        const hello = async ()=>{
            try{
                await init()
                setResponse('connect to backend')
            }catch{
                setResponse('backend connect fail')
            }
        }
        hello()
    },[])
    return(
        <div>
            {response}
        </div>
    )
}

export default Post