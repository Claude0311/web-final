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
    Input
  } from 'antd';
// import './House_Query.css'
import { updateHouseInformation } from '../axios/axios';
import buildingType from '../axios/buildingType';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UpdateQueryForm = ({name, id, ori_buildingType, ori_floor, ori_age, 
            showForm, ori_lat, ori_lng, moveCen, showNewHouse}) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [lat, setLat] = useState(ori_lat)
    const [lng, setLng] = useState(ori_lng)

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
      const data = await updateHouseInformation(id, parseFloat(lat), parseFloat(lng), parseInt(buildingType), numOfFloor, houseAge)
      setVisible(false)
      if(data) {
        const {similar, avgPrice} = data
        if(buildingType === undefined) buildingType = ori_buildingType
        if(numOfFloor === undefined) numOfFloor = ori_floor
        if(houseAge === undefined) houseAge = ori_age
        showNewHouse(lat, lng, similar, avgPrice, buildingType, numOfFloor, houseAge)
        moveCen(lat, lng)
      }
      
		}

    const showUpdateForm = () => {
      setVisible(true)
      showForm()
    }
    const handleReaddress = () => {
      
    }
		const resetForm = () => {
			form.resetFields();
		}
		const handleOK = async () => {
      setLoading(true);
      await form.submit();
			setLoading(false)    
		}
		const handleCancel = () => {
			setVisible(false);
		}

  return (
    <>
      <a 
        onClick={showUpdateForm}>
        {name}
      </a>
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
        {/* <Button key="changeAddress" onClick={handleReaddress}>Change position</Button> */}
        <Form.Item name="lat" label="緯度">
          {lat}
        </Form.Item>

        <Form.Item name="lng" label="經度">
          {lng}
        </Form.Item>

        <Form.Item name="buildingType" label="房屋類型">
          <Select placeholder={buildingType[ori_buildingType]}>
            <Option value={undefined}>不限</Option>
            <Option value="0">公寓(5樓以下無電梯)</Option>
            <Option value="1">電梯大樓(10樓以下有電梯)</Option>
            <Option value="2">華夏(11樓以上有電梯)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="numOfFloor" label="樓層">
          <span>
            <InputNumber 
              placeholder={ori_floor}
              min={MinFloor}
              max={MaxFloor}
            /> 
            <span className="ant-form-text">樓 (optional)</span>
          </span>
        </Form.Item>

        <Form.Item name="houseAge" label="屋齡">
          <span>
            <InputNumber 
              placeholder={ori_age}
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

export default UpdateQueryForm
