import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
const Post = () => {
    const [response,setResponse] = useState('connecting bakend')
    useEffect(()=>{
        axios.post('http://localhost:4000/func')
            .then(({data})=>{
                console.log(`get data：\n${data}`)
                console.log(data)
                const hey = eval('('+data.hey+')')//`(${data.hey})` won't work
                hey()
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