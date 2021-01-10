import { Drawer, Divider, Col, Row } from 'antd';
import {useState} from 'react';
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
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

function House_Detail({detail, onClose}) { //,onClose,visible
    // onClose={()=>closeDetail()} visible={true}
    return (
        <Drawer
          width={320}
          placement="right"
          closable={true}
          onClose={()=>onClose()}
          visible={true}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            House Information
          </p>
          <p className="site-description-item-profile-p">Info</p>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="soldtime"
                content={detail.soldTime}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="age"
                content={detail.age}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="has parking"
                content={(detail.hasParking)? "yes":"no"}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="address"
                content={detail.address}
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Price</p>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="total price"
                content={detail.price.totalPrice}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="parking price"
                content={detail.price.parkingPrice}
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Space</p>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="total space"
                content={detail.space.totalSpace}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="parking space"
                content={detail.space.parkingSpace}
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">floor</p>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="floor"
                content={detail.floor.floor}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="max floor"
                content={detail.floor.maxFloor}
              />
            </Col>
          </Row>
        </Drawer>
    );
}

export default House_Detail;