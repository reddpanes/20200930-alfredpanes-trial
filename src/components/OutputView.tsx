import React from 'react';
import UserDataType from "../types/UserDataType";
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

const divStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid gray',
  margin: '10px',
}

export default function OutputView({data}: {data: UserDataType}){
  return(
    <>
      <Row justify={'center'}>
        <Col span={11} style={divStyle}>
          <Text strong>Name:</Text>
          <Text>{data.name}</Text>
        </Col>
        <Col span={11} style={divStyle}>
          <Text strong>Email:</Text>
          <Text>{data.email}</Text>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col span={11} style={divStyle}>
          <Text strong>Gender:</Text>
          <Text>{data.gender}</Text>
        </Col>
        <Col span={11} style={divStyle}>
          <Text strong>Country:</Text>
          <Text>{data.country}</Text>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col span={11} style={divStyle}>
          <Text strong>Age:</Text>
          <Text>{data.age}</Text>
        </Col>
        <Col span={11} style={divStyle}>
          <Text strong>City:</Text>
          <Text>{data.city}</Text>
        </Col>
      </Row>
    </>
  )
}