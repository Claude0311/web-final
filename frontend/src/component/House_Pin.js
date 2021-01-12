import {Popover,Button} from 'antd';
import {EnvironmentFilled} from '@ant-design/icons';
import {useState} from 'react'
import './House_Pin.css';

const House_Pin = ({id,buildingType,click,unitPrice,hover,getDetail}) => {
    const [visible, setvisible] = useState(false); // control Popover
    const title = (
        <span>house id:{id}</span>
    );
    const content = (
        <>
        <p>Type: {buildingType}</p>
        <p>Unit Price: NT${unitPrice}</p>
        <a onClick={async()=>{
            await setvisible(false);
            console.log("in func",id);
            getDetail(id);
        }}>more details</a>
        </>
    );
    const iconStyle = {
        position: 'absolute',
        bottom: '0',
        left: '-8pt',
        fontSize: '16pt',
        color: '#08c'
    };
    const iconStyleHover = {
        ...iconStyle,
        left: '-10pt',
        fontSize: '20pt',
        color: '#0ac'
    };
    const handleVisible = (v) => {
        setvisible(v);
    }

    let style = (hover)? iconStyleHover: iconStyle;

    return (
        <div className="house-pin">
        <Popover 
            placement='right' 
            title={title} 
            content={content}
            trigger="click" 
            visible={click && visible}
            onVisibleChange={handleVisible}
        >    
            <EnvironmentFilled style={style}/>
        </Popover>
        </div>
    );
}
const Current_Pin = ({showForm})=>{
    const myStyle = {
        fontSize: '18pt',
        color: '#0c8'
    };
    const [visible, setvisible] = useState(false);
    const handleVisible = (v) => {
        setvisible(v);
    }
    return(
        <div className="house-pin">
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
        </div>
    );
}
export {House_Pin,Current_Pin};