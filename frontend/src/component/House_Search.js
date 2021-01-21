/**
 * 1. buildingType	String	(optional) => sigle select
公寓(無電梯)
大樓(10樓以下有電梯)
華夏(11樓以上有電梯)
2.  neighbor	Object	搜索附近(optional) => 
 center	Object	中心
  lat	Object	中心緯度
  lng	Object	中心經度
 distance	Object	距離(公尺)
3. unitPrice	Object	每坪價格(optional)
 lb	Number	lower bound (optional)
 ub	Number	upper bound (optional)
4. totalPrice	Object	總價(optional)
 lb	Number	lower bound (optional)
 ub	Number	upper bound (optional)
5. space	Object	坪數(optional)
 lb	Number	lower bound (optional)
 ub	Number	upper bound (optional)
6. hasParking	Boolean	有無車位(optional)
 */
import { useState } from 'react';
import { CaretDownOutlined} from '@ant-design/icons';
import {
    Input,
    Form,
    Select,
    Radio,
    Button,
    Modal,
    Tooltip
  } from 'antd';
import SearchNumber from './SearchInput';
// import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};



const SearchForm = ({setCriteria,onSearch}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // self defined var
  const MinPrice = 1;
  const MaxPrice = 100000;
  const MinSpace = 1;
  const MaxSpace = 100;

  // get value of requirement 
  const onFinish = ({ 
    buildingType, 
    hasParking,
    space_lb,
    space_ub,
    totalPrice_lb,
    totalPrice_ub,
    unitPrice_lb,
    unitPrice_ub
    }) => {
    // console.log('Received values of form: ', values);
    // simple check
    if (unitPrice_lb >= unitPrice_ub) {
      form.setFieldsValue({
        unitPrice_lb: undefined,
        unitPrice_ub: undefined
      })
      unitPrice_lb = undefined;
      unitPrice_ub = undefined;
    }
    if (totalPrice_lb >= totalPrice_ub) {
      totalPrice_ub = undefined;
      totalPrice_lb = undefined;
    }
    if (space_lb >= space_ub) {
      space_lb = undefined;
      space_ub = undefined;
    }
    const criteria = {
      buildingType,
      hasParking,
      space: { ub: space_ub, lb: space_lb},
      totalPrice: {
        ub: totalPrice_ub,
        lb: totalPrice_lb
      },
      unitPrice: {
        ub: unitPrice_ub,
        lb: unitPrice_lb
      }
    }
    // console.log(criteria);
    setCriteria(criteria);
  };
  const showSearchForm = ()=> {
      setVisible(true);
  }
  const resetForm = () => {
    form.resetFields();
  }
  const handleOK = async () => {
    setLoading(true);
    await form.submit();
    setLoading(false);
    setVisible(false);
  }
  const handleCancel = () => {
    setVisible(false);
  }
  return (
    <>
      <Input.Search
                    placeholder="Search in Address"
                    style={{ width: 500, margin: '0 20px' }}
                    addonBefore={
                      <Tooltip title="Search Option" placement="bottom">
                        <Button 
                        type="text" 
                        size="small"
                        shape="circle"
                        icon={<CaretDownOutlined style={{ color: 'rgba(0,0,0,.45)' }}/>}
                        onClick={showSearchForm}>
                        
                      </Button>
                    </Tooltip>}
                    onPressEnter={e=>onSearch(e.target.value)}
                    onSearch={onSearch}
                    allowClear
                />
      <Modal

        visible={visible}
        title="Search With Condition"
        onOk={handleOK}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={resetForm}>
            Reset
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleOK}>
            Submit
          </Button>
        ]}
      >
      <Form
        form={form}
        name="search_form"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          hasParking: undefined,
          buildingType: undefined
        }}
      > 
        <Form.Item
          name="buildingType"
          label="房屋類型"
        //   rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
        >
          <Select placeholder="Please select building type">
            <Option value={undefined}>不限</Option>
            <Option value={0}>公寓(無電梯)</Option>
            <Option value={1}>電梯大樓(10樓以下有電梯)</Option>
            <Option value={2}>華夏(11樓以上有電梯)</Option>
          </Select>
        </Form.Item>
  
        <Form.Item name="unitPrice_ub" label="每坪房價">

          <SearchNumber 
            unit="以下"
            min={MinPrice}
            max={MaxPrice}
          />
        </Form.Item>
        <Form.Item name="unitPrice_lb" label="每坪房價">  
          <SearchNumber 
            unit="以上"
            min={MinPrice}
            max={MaxPrice}
          />
          
        </Form.Item>
        <Form.Item name="totalPrice_ub" label="總房價">
          <SearchNumber 
            // defaultValue={100}
            unit="以下"
            min={MinPrice}
            max={MaxPrice}
          /> 
        </Form.Item>
        <Form.Item name="totalPrice_lb" label="總房價">        
          <SearchNumber 
            // defaultValue={100}
            unit="以上"
            min={MinPrice}
            max={MaxPrice}
          />
          
        </Form.Item>
        <Form.Item name="space_ub" label="坪數">
          
          <SearchNumber
            // defaultValue={30}
            unit="坪以下"
            min={MinSpace}
            max={MaxSpace}
            useDomination={false}
          />
        </Form.Item>
        <Form.Item name="space_lb" label="坪數"> 
          <SearchNumber 
            // defaultValue={30}
            unit="坪以上"
            min={MinSpace}
            max={MaxSpace}
            useDomination={false}
          />
          
        </Form.Item>
  

        <Form.Item 
          name="hasParking" 
          label="停車位"
        >
          <Radio.Group>
            <Radio value={undefined}>不限</Radio>
            <Radio value={false}>無</Radio>
            <Radio value={true}>有</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      </Modal>
      
    </>
    );
  };
  
export default SearchForm;