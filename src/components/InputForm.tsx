import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { Row, Col, Input, Select, Button, Typography, Table } from 'antd'



//citiesData
import countries from '../data/countries';
import UserDataType from "../types/UserDataType";
import {CSVReader} from "react-papaparse";
import ConfirmDelete from "./ConfirmDelete";

const { Option } = Select;
const { Text } = Typography;


const inputSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  gender: yup.mixed().oneOf(['Male', 'Female']).required('Gender is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  age: yup.number().min(1).max(120).required('Age is required'),
});

type InputFormProps = {
  saveData: Function,
  setTableData: Function,
}

export default function InputForm({saveData, setTableData}:InputFormProps){

  const [cities, setCities] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [csvData, setCSVData] = useState([]);

  const initialValues: UserDataType = {
    name: '',
    email: '',
    gender: '',
    country: '',
    city: '',
    age: 0,
  };

  const handleSubmitForm = (values: UserDataType) => {
    saveData(values);
  };

  const handleParseCSV = (csvData: any) => {

    const newData = csvData.map( (indivData:any) => {
      const dataPair = [...indivData.data];
      return { name: [dataPair[0]], price : parseFloat(dataPair[1]) }
    });
    newData.shift();
    setCSVData(newData);
    setTableData(newData);
  };

  const removeCSVData = () => {
    setCSVData([]);
    setConfirmDelete(false);
  }



  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={inputSchema}
        onSubmit={(values: UserDataType) => handleSubmitForm(values)}
        render={({ handleSubmit, errors, touched , setFieldValue, values})=>(
          <Form
            onSubmit={handleSubmit}
          >
            <Row gutter={16}>
              <Col className={'gutter-row'} span={14}>
                <Field
                  name={'name'}
                  render={({ field }: {field: any}) => (
                    <Input
                      { ...field }
                      type={'text'}
                      placeholder={'Last name, First name'}
                      addonBefore={'Name'}
                    />
                  )}
                />
                {
                  touched.name && errors.name
                    ? <div style={{color: 'red'}}>{errors.name}</div>
                    : null
                }
              </Col>
              <Col className={'gutter-row'} span={5}>
                <Field
                  name={'gender'}
                  value={values.gender}
                  render={({field}:{field:any})=>(
                      <Select
                        placeholder={'Select Gender'}
                        style={{width: '100%'}}
                        onChange={(value)=>setFieldValue('gender', value)}
                      >
                        <Option value={'Male'}>Male</Option>
                        <Option value={'Female'}>Female</Option>
                      </Select>

                  )}
                >
                </Field>
                {
                  touched.gender && errors.gender
                    ? <div style={{color: 'red'}}>{errors.gender}</div>
                    : null
                }
              </Col>
              <Col className={'gutter-row'} span={5}>
                <Field
                  name={'age'}
                  render={({ field }: {field: any}) => (
                    <Input
                      { ...field }
                      type={'age'}
                      placeholder={'Age'}
                      addonBefore={'Age:'}
                    />
                  )}
                />
                {
                  touched.age && errors.age
                    ? <div style={{color: 'red'}}>{errors.age}</div>
                    : null
                }
              </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '10px'}}>
              <Col className={'gutter-row'} span={14}>
                <Field
                  name={'email'}
                  render={({ field }: {field: any}) => (
                    <Input
                      { ...field }
                      type={'email'}
                      placeholder={'Email'}
                      addonBefore={'Email'}
                    />
                  )}
                />
                {
                  touched.email && errors.email
                    ? <div style={{color: 'red'}}>{errors.email}</div>
                    : null
                }
              </Col>
              <Col className={'gutter-row'} span={5}>
                <Field
                  name={'country'}
                  value={values.country}
                  render={({field}:{field:any})=>(
                    <Select
                      placeholder={'Select Country'}
                      style={{width: '100%'}}
                      onSelect={(_, option)=>setCities(countries[option.index].cities)}
                      onChange={(value)=>setFieldValue('country', value)}
                    >
                      {countries.map((country, index: number)=>(
                        <Option
                          key={index}
                          index={index}
                          value={country.country}
                        >{country.country}</Option>
                      ))}
                    </Select>

                  )}
                />
                  {
                    touched.country && errors.country
                      ? <div style={{color: 'red'}}>{errors.country}</div>
                      : null
                  }
              </Col>
              <Col className={'gutter-row'} span={5}>
                <Field
                  name={'city'}
                  value={values.city}
                  render={({field}:{field:any})=>(
                    <Select
                      placeholder={'Select City'}
                      style={{width: '100%'}}
                      onChange={(value)=>setFieldValue('city', value)}>
                      {cities.map((city, index: number)=>(
                        <Option
                          key={index}
                          value={city}
                        >{city}</Option>
                      ))}
                    </Select>

                  )}
                />
                {
                  touched.city && errors.city
                    ? <div style={{color: 'red'}}>{errors.city}</div>
                    : null
                }
              </Col>
            </Row>
            <div style={{margin: '20px 0'}}>
              <Text strong >Input CSV Data</Text>
            </div>

            <Row gutter={16} justify={'center'}>
              <Col span={11}>
                <div style={{width:'80%'}}>
                  <CSVReader
                    onDrop={(data)=>handleParseCSV(data)}
                    noDrag
                    style={{width: '80%'}}
                    addRemoveButton
                    onRemoveFile={()=>setConfirmDelete(true)}
                  >
                    <span>Click to Upload</span>
                  </CSVReader>
                </div>
                <Row justify={'center'} style={{marginTop: '20px'}}>
                  <Button htmlType={'submit'} type={'primary'} disabled={csvData.length === 0}>Continue</Button>
                </Row>
              </Col>
              <Col span={11}>
                {csvData.length > 0 && <Table
                  columns={[
                    {
                      title: 'Product Name',
                      dataIndex: 'name',
                      key: 'name'
                    },
                    {
                      title: 'Price',
                      dataIndex: 'price',
                      key:'price',
                    }
                  ]}
                  dataSource={csvData}
                />}
              </Col>

            </Row>


          </Form>
        )}
      />
      <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} removeCSVData={removeCSVData}/>
    </>
  )
}