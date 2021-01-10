import { useState } from 'react';
import { InputNumber, Select } from 'antd';
const { Option } = Select;
const SearchNumber = ({value={}, onChange, unit, min, max, useDomination=true}) => {
    const [number, setNumber] = useState(null);
    const [domination, setDomination] = useState(10000);
    const triggerChange = (changedValue) => {
      if (onChange) {
        if (useDomination) {
          const newnum = changedValue.number || number;
          const newDomin = changedValue.domination || domination;
          onChange(newnum*newDomin);
        }
        else {
          onChange(changedValue.number);
        }
        
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
  
    return (
      <span>
        <InputNumber 
          min={min}
          max={max}
          value={number}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          style={{width: "100px"}}
          onChange={onNumberChange}
        />
        {(useDomination)?
        <Select 
          value={domination}
          defaultValue={10000}
          style={{
            width: 80,
            margin: '0 8px',
          }}
          onChange={onDominationChange}
          >
          <Option value={10000}>萬</Option>
          <Option value={1000000}>百萬</Option>  
        </Select>
        :
        <></>}
        <span className="ant-form-text">{unit}</span>
     </span>
    )
}

export default SearchNumber;