import { Button, Drawer, Divider, Col, Row } from 'antd';
import BuildingType from '../axios/buildingType';
import { dateConvert, priceConvert } from '../util/util';
import "./House_detail.css"
/**
 * when click on the house, more info will show on the right side of the map
 * input detail api
 * House_detail = {
    soldTime: Number,
    address: String,
    price: {
        totalPrice: Number,
        parkingPrice: {type:Number,default:0}
    },
    space: {
        totalSpace: Number,//坪
        parkingSpace: {type:Number,default:0}
    },
    floor: {
        floor: Number,
        maxFloor: Number
    },
    age: Number,
    hasParking: {
        type:Boolean,
        default:false
    }
 */

const DescriptionItem = ({ title, content, before, after }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {before}{content} {after}
    </div>
  );

function House_Detail({detail, onClose}) { 

    return (
        <Drawer
          width={480}
          placement="right"
          closable={true}
          onClose={onClose}
          visible={true}
          getContainer={true}
          style={{ position: 'absolute', height: '100%' }}
          footer={
            <div
              style={{
                textAlign: 'right',
                marginBottom: "30px"
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              {/* <Button onClick={onClose} type="primary">
                Like
              </Button> */}
            </div>
          }
        >
          <p className="site-description-item-profile-p">House Information</p>
          <Divider />
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="address"
                content={detail.address}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Building type"
                content={BuildingType[detail.buildingType]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="soldtime"
                content={dateConvert(detail.soldTime)}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="age"
                content={detail.age}
                after="years"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="樓層"
                content={detail.floor?.floor}
                after="樓"
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="總樓層"
                content={detail.floor?.maxFloor}
                after="樓"
              />
            </Col>
          </Row>
          
          <Divider />
          <p className="site-description-item-profile-p">Price and Space</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="unitPrice"
                content={priceConvert(detail.unitPrice)}
                before="NT$"
                after=" / 坪"
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="total price"
                content={priceConvert( detail.price?.totalPrice)}
                before="NT$"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="total space"
                content={detail.space?.totalSpace}
                after="坪"
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Parking</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="是否有停車位"
                content={(detail.hasParking)? "有":"無"}
              />
            </Col>
          </Row>
          {(detail.hasParking)?
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="parking price"
                content={priceConvert(detail.price?.parkingPrice)}
                before="NT$"
              />
            </Col>                       
            <Col span={12}>
              <DescriptionItem
                title="parking space"
                content={detail.space?.parkingSpace}
                after="坪"
              />
            </Col>
          </Row>: <></>}
        </Drawer>
    );
}

export default House_Detail;