import React from 'react';
import UserDataType from "../types/UserDataType";
import { Row, Col, Typography, Table } from 'antd';
import useOutputTableColumns from "../hooks/useOutputTableColumns";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const { Text } = Typography;

const divStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid gray',
  margin: '10px',
};

type OutputProps = {
  data: UserDataType,
  tableData: any
}

export default function OutputView({data, tableData}: OutputProps){

  const columns = useOutputTableColumns();

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
      <Row justify={'center'}>
        <Col span={11} style={divStyle}>
          <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 10 }} scroll={{ y: 240 }}/>
        </Col>
        <Col span={11} style={divStyle}>
          <BarChart
            data={tableData}
            width={700}
            height={350}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'name'} interval={0} angle={90} textAnchor='start' height={120}/>
            <YAxis dataKey={'price'}/>
            <Legend verticalAlign={'top'}/>
            <Tooltip/>
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </Col>
      </Row>
    </>
  )
}