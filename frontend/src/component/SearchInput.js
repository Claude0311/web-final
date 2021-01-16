import { useEffect, useState } from 'react';
import { InputNumber, Select } from 'antd';
import { priceConvert } from '../util/util';
const { Option } = Select;
const SearchNumber = ({value={}, onChange, unit, min, max, useDomination=true}) => {
    const [number, setNumber] = useState(null);
    const [domination, setDomination] = useState(10000);
    const triggerChange = (changedValue) => {
      if (onChange) {
        const newnum = changedValue.number || number;
        const newDomin = changedValue.domination || domination;
        const mul = newnum*newDomin;
        onChange((mul>0)? mul: undefined);
      }
    };
  
    const onNumberChange = (value) => {
      setNumber(value);
      triggerChange({
        number: value
      });
    }
  
    const onDominationChange = (newDomin) => {
      // if (!('domination' in value)) {
      //   setDomination(newDomin);
      // }
      setDomination(newDomin);
      triggerChange({
        domination: newDomin,
      });
    };
    useEffect(()=>{
      if (!useDomination) {
        setDomination(1);
      }
    })
    return (
      <span>
        <InputNumber 
          min={min}
          max={max}
          value={number}
          formatter={priceConvert}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          style={{width: "100px"}}
          onChange={onNumberChange}
        />
        {(useDomination)?
        <Select 
          value={domination}
          defaultValue={10000}
          style={{
            width: 90,
            margin: '0 8px',
          }}
          onChange={onDominationChange}
          >
          <Option value={10000}>萬元</Option>
          <Option value={1000000}>百萬元</Option>  
        </Select>
        :
        <></>}
        <span className="ant-form-text">{unit}</span>
     </span>
    )
}

export default SearchNumber;