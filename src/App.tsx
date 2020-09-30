import React, { useState } from 'react';
import './App.css';
import { Radio, Row } from 'antd';
import InputForm from './components/InputForm';
import formatName from "./utils/formatName";
import UserDataType from "./types/UserDataType";
import OutputView from "./components/OutputView";

function App() {

  const [view, setView] = useState('input');
  const [data, setData] = useState<UserDataType>({
    name: '',
    email: '',
    gender: '',
    country: '',
    city: '',
    age: 0,
});

  const saveData = (values: UserDataType ): any => {
    const formattedName = formatName(values.name);
    setData({
      ...values, name: formattedName
    });
    setView('output');
  }

  return (
    <>
      <Row justify={'center'} style={{margin: '20px'}}>
        <Radio.Group value={view} onChange={(e)=>setView(e.target.value)}>
          <Radio.Button value={'input'}>INPUT</Radio.Button>
          <Radio.Button value={'output'} disabled={!data}>OUTPUT</Radio.Button>
        </Radio.Group>
      </Row>
      <div style={{margin: '0 10%'}}>
        {view === 'input' ? <InputForm saveData={saveData}/> : <OutputView data={data}/>}
      </div>
    </>
  );
}

export default App;
