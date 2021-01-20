/**
1. position 位置
 lat    緯度
 lng    經度
2. buildingType	String	(optional) => sigle select
公寓(無電梯)
大樓(10樓以下有電梯)
華夏(11樓以上有電梯)
3. floor	Object	樓層(optional)
4. age	Object	屋齡(optional)
 */
import {useState} from 'react'
import {
    Form,
    Select,
    Button,
    Modal,
    InputNumber,
    Input,
    message
  } from 'antd';
import './House_Query.css'
import SearchNumber from './SearchInput';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
export const SetManualPriceForm = (props) => {
    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(true);
    }
    const submitPrice = (p) => {
        if (p) {
            props.setPrice(p);
            // submit
        } else {
            // don't submit
            message.error("Price should be Number",[1]);
        }
    }
    return (
        <>
        {(visible)
            ? <SearchNumber
                name="manualPrice"
                placeholder="price"
                onEnter={submitPrice}
            ></SearchNumber>
            : <a onClick={handleClick}> {props.children}</a>}
        </>
    )
}
