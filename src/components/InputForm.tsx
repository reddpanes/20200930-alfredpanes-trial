import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { Row, Col, Input, Select, Button } from 'antd'


//citiesData
import countries from '../data/countries';
import UserDataType from "../types/UserDataType";

const { Option } = Select;



const inputSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  gender: yup.mixed().oneOf(['Male', 'Female']).required('Gender is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  age: yup.number().min(1).max(120).required('Age is required'),
});

export default function InputForm({saveData}:{saveData: any}){

  const [cities, setCities] = useState<string[]>([]);

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
  }

  console.log(cities);
  return (
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
            <Row justify={'center'} style={{marginTop: '20px'}}>
              <Button htmlType={'submit'} type={'primary'}>Continue</Button>
            </Row>
          </Form>
        )}
      />
  )
}