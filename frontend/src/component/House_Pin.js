import { Tooltip, Avatar, Popover, Divider } from 'antd';
import {EnvironmentFilled, HomeFilled} from '@ant-design/icons';
import BuildingType from '../axios/buildingType';
import {useEffect, useState} from 'react'
import './House_Pin.css';
import { priceConvert } from '../util/util';
import QueryForm from './House_Query';
import { SetManualPriceForm } from './House_Valuate';

const House_Pin = ({id,buildingType,click,unitPrice,hover,getDetail}) => {
    const [visible, setvisible] = useState(false); // control Popover
    const title = (
        <span>House Info</span>
    );
    const content = (
        <>
        <p>Type: {BuildingType[buildingType]}</p>
        <p>Unit Price: NT${priceConvert(unitPrice)}</p>
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

const House_Cluster = ({sum, size, pointSize, hover, click, ...props }) => {
    const [points, setPoints] = useState([]);
    const overflowCount = (size) => (size <= 99)? String(size): "99+";

    const handleClick = () => {
        const leaves = props.getLeaves(props.id);
        // console.log(leaves);
        if (leaves){
            setPoints(leaves);
        }
    }

    let ratio = (hover)? 8:0;
    let markSize = Math.floor(ratio+40-0.4*pointSize/size);
    const content = (
        <div className="cluster">
            <p>Average: NT${priceConvert(Math.round(sum/size))}</p>
            {(points && points.length > 0)
                ?<p>Type: {BuildingType[points[0].buildingType]}</p>
                :<a onClick={handleClick}>get more</a>
            }
            {(points && points.length > 0)
                ?points.map((l,ind) => (
                    <>
                        <Divider plain>house {ind+1}</Divider>
                        <p>Unit Price: NT${priceConvert(l.unitPrice)}</p>
                        <a onClick={async()=>{
                            // await setvisible(false);
                            props.getDetail(l.id);
                        }}>more details</a>                    
                    </>
                ))
                :<></>
            }
        </div>
    )
    return (
        <Popover 
            placement='right'
            title={`Cluster with ${size} houses`}
            visible={click}
            content={content}
            trigger="click"
        >
            <Avatar 
                style={{ 
                    backgroundColor: '#0b9',
                    cursor: 'pointer',
                    fontSize: `${(hover? "16":"14")}px`,
                    position: 'absolute',
                    bottom: `-${markSize/2}px`,
                    left: `-${markSize/2}px`
                }}
                size={markSize}
            >{overflowCount(size)}</Avatar>
        </Popover>
        
    )
}

const Current_Pin = ({hover, showForm, click, lat, lng, moveCen})=>{
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

    const content = (
        <div>
            <QueryForm 
                name="inquire house price" 
                showForm={showForm} 
                lat={lat} 
                lng={lng}
                moveCen={moveCen}
            />
        </div>
    );
    return(
        <div className="house-pin">
        <Popover 
            placement='right'
            title="New Mark"
            trigger="click"
            visible={click}
            content={content}
            
        >
            <EnvironmentFilled style={style}/>
        </Popover>
        </div>
    );
}

// ====== the pin for user when it complete the query
const House_Eval_Pin = (props) => {
    // processed or not
    // admin or not
    const myStyle = {
        position: 'absolute',
        bottom: '0',
        left: '-9pt',
        fontSize: '18pt',
        color: (props.auth)
            ? ((props.processed)?'#945':'#fd0')
            : ((props.processed)?'#634':'#460')
    };
    const myStyleHover = {
        ...myStyle,
        left: '-10pt',
        fontSize: '20pt'
    }
    const setPrice = (p) => {
        props.setManualPrice({_id:props.id, manualPrice:p});
    }
    const authFunction = (props.auth)
        ?
        <SetManualPriceForm 
            setPrice={setPrice}
        >Set Manual Price</SetManualPriceForm>
        : <a onClick={props.updateInfo} >Update information</a>
    let style = (props.hover)?  myStyleHover: myStyle;

    // useEffect(()=>{
    //     console.log("this  is eval pin");
    //     console.log(props);
    // })
    const content = (
        <div>
            <p>avg: NT${priceConvert(props.avgPrice)}</p>
            {(props.age)? <p>age: {props.age} years</p> :<></>}
            {(props.floor)? <p>floor: {props.floor} floor</p> :<></>}
            <p></p>
            {authFunction}
        </div>
    );
    return(
        <div className="house-pin">
        <Popover 
            placement='right'
            title={`${props.user}'s house`}
            trigger="click"
            visible={props.click}
            content={content}
        >
            <EnvironmentFilled style={style}/>
        </Popover>
        </div>
    );
};

export {House_Pin, House_Cluster, Current_Pin, House_Eval_Pin};