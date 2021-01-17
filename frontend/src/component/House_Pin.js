import { Tooltip, Avatar, Popover,Button } from 'antd';
import {EnvironmentFilled} from '@ant-design/icons';
import BuildingType from '../axios/buildingType';
import {useEffect, useState} from 'react'
import './House_Pin.css';

const House_Pin = ({id,buildingType,click,unitPrice,hover,getDetail}) => {
    const [visible, setvisible] = useState(false); // control Popover
    const title = (
        <span>House Info</span>
    );
    const content = (
        <>
        <p>Type: {BuildingType[buildingType]}</p>
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

    let style = (hover || visible)? iconStyleHover: iconStyle;

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

const House_Cluster = ({id, size, pointSize, hover }) => {
    const overflowCount = (size) => (size <= 99)? String(size): "99+";
    const zoomIn = () => {
        console.log("zoom in")
        return;
    }

    let ratio = (hover)? 8:0;
    let markSize = Math.floor(18+ratio+100*size/pointSize);
    return (
        <Avatar 
            style={{ 
                backgroundColor: '#0b9',
                cursor: 'pointer',
                fontSize: `${(hover? "16":"14")}px`,
                position: 'absolute',
                bottom: `-${markSize/2}px`,
                left: `-${markSize/2}px`
            }}
            // style={style}
            onClick={zoomIn}
            size={markSize}
        >{overflowCount(size)}</Avatar>
    )
}

const Current_Pin = ({hover, showForm, click})=>{
    const myStyle = {
        position: 'absolute',
        bottom: '0',
        left: '-9pt',
        fontSize: '18pt',
        color: '#f80'
    };
    const myStyleHover = {
        ...myStyle,
        left: '-10pt',
        fontSize: '20pt'
    }
    let style = (hover)?  myStyleHover: myStyle;
    // const [visible, setvisible] = useState(false);
    // const handleVisible = (v) => {
    //     setvisible(v);
    // }
    // const onShowForm = async() => {
    //     // await handleVisible(false);
    //     showForm();
    // }
    const content = (
        <div>
            <p>address</p>
            <a onClick={showForm}>fill in</a>
        </div>
    );
    return(
        <div className="house-pin">
        <Popover 
            placement='right'
            title="New Mark"
            visible={click}
            // onVisibleChange={handleVisible}
            content={content}
            trigger="click"
        >
            <EnvironmentFilled style={style}/>
        </Popover>
        </div>
    );
}
export {House_Pin, House_Cluster, Current_Pin};