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
    message
  } from 'antd';
// import './House_Query.css'
import { sendHouseInformation } from '../axios/axios';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const QueryForm = ({name, showForm, lat, lng, moveCen, showNewHouse}) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)

    // self defined var
    const MinFloor = 1
    const MaxFloor = 100
    const MinAge = 0
		const MaxAge = 50
		
		// get value of requirement 
		const onFinish = async({
			buildingType,
			numOfFloor,
			houseAge
			}) => {
      if(buildingType === undefined) {
        message.error("Please select a building type!", [1])
      }
      else {
        const house = {
          lat,
          lng,
          buildingType: parseInt(buildingType),
          floor: numOfFloor,
          age: houseAge
        }
        const data = await sendHouseInformation(house)
        if(data) {
          const {similar, avgPrice} = data
          showNewHouse(lat, lng, similar, avgPrice, buildingType, numOfFloor, houseAge)
          moveCen(lat, lng)
        }      
        
        setVisible(false);         
      }
		}

    const showQueryForm = () => {
      setVisible(true)
      showForm()
    }
		const resetForm = () => {
			form.resetFields();
		}
		const handleOK = async() => {
      setLoading(true)
      await form.submit()
      setLoading(false)	    
		}
		const handleCancel = () => {
			setVisible(false);
		}

  return (
    <>
      <Button 
        type="primary" 
        onClick={showQueryForm}>
        {name}
      </Button>
      <Modal
        visible={visible}
        title="House Condition"
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
          </Button>,
        ]}
      >
      <Form
        form={form}
        name="qurey_form"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          buildingType: undefined,
        }}
      > 
        <Form.Item name="lat" label="緯度">
          {lat}
        </Form.Item>

        <Form.Item name="lng" label="經度">
          {lng}
        </Form.Item>

        <Form.Item name="buildingType" label="房屋類型">
          <Select placeholder="Please select building type">
            <Option value={undefined}>不限</Option>
            <Option value="0">公寓(5樓以下無電梯)</Option>
            <Option value="1">電梯大樓(10樓以下有電梯)</Option>
            <Option value="2">華夏(11樓以上有電梯)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="numOfFloor" label="樓層">
          <span>
            <InputNumber 
              min={MinFloor}
              max={MaxFloor}
            /> 
            <span className="ant-form-text">樓 (optional)</span>
          </span>
        </Form.Item>

        <Form.Item name="houseAge" label="屋齡">
          <span>
            <InputNumber 
              min={MinAge}
              max={MaxAge}
            /> 
            <span className="ant-form-text">年 (optional)</span>
          </span>
        </Form.Item>
      </Form>
      </Modal>
    </>
  )
}

export default QueryForm
