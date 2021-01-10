import {Popover,Button} from 'antd';
import {EnvironmentFilled} from '@ant-design/icons';
import {useState} from 'react'

const House_Pin = ({id,buildingType,unitPrice,getDetail,move}) => {
    const [visible, setvisible] = useState(false);
    const title = (
        <span>house id:{id}</span>
    );
    const content = (
        <>
        <p>Type: {buildingType}</p>
        <p>Unit Price: NT${unitPrice}</p>
        <a onClick={async()=>{
            await setvisible(false);
            getDetail(id);
        }}>more details</a>
        </>
    );
    const iconStyle = {
        fontSize: '16pt',
        color: '#08c',
        $nested: {
            "&:hover": {
                fontSize: '20pt',
                color: '#80c'
            }
        }

    };
    const handleVisible = (v) => {
        // setTimeout(()=> setvisible(v),100);
        setvisible(v);
    }
    return (
        <Popover 
            placement='right' 
            title={title} 
            content={content}
            trigger="click" 
            visible={visible}
            onVisibleChange={handleVisible}
            // onClick={()=>{                
            //     // window.setTimeOut(()=>this.setvisible(true),500);
            //     setvisible(false)
            //     move();
            // }}
        >    
            <EnvironmentFilled style={iconStyle}/>
        </Popover>
    );
}
const Current_Pin = ({showForm})=>{
    const myStyle = {
        //align: 'center'
        fontSize: '18pt',
        color: '#0c8'
    };
    const [visible, setvisible] = useState(false);
    const handleVisible = (v) => {
        setvisible(v);
    }
    return(
        <Popover 
            placement='right'
            title="your house"
            visible={visible}
            onVisibleChange={handleVisible}
            content={
                <div>
                    <a onClick={async() =>{
                        await handleVisible(false);
                        showForm();
                    }}>fill in</a>
                </div>
            }
            trigger="click"
        >
            <EnvironmentFilled style={myStyle}/>
        </Popover>
    );
}
export {House_Pin,Current_Pin};