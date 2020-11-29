import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
const Post = () => {
    const [response,setResponse] = useState('connecting bakend')
    useEffect(()=>{
        axios.get('http://localhost:4000/')
            .then(({data})=>{
                console.log(`get data：\n${data}`)
                setResponse('connect to backend')
            }).catch((e)=>{
                console.error(e)
                setResponse('backend connect fail')}
            )
    },[])
    return(
        <div>
            {response}
        </div>
    )
}

export default Post