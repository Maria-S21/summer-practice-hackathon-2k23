import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
  
export default function App() {

  const [code, setCode] = useState(0);
  const [objData, setObjData] = useState([]);

  function generateCode()
  {
    const newCode = Math.floor(100000 + Math.random() * 900000);
    setCode(newCode);
  }

  const handleSubmit = (event) =>
    {
      event.preventDefault()
      const newObjData = {};
      const formData = new FormData(event.target);
      formData.forEach((value,key) => newObjData[key] = value);
      setObjData([...objData,newObjData]);
    }

  function deleteCode(val)
  {
    setObjData((current) => current.filter((obj) => obj.code !== val));
  }

  function CodesList({obj})
  {
    return(
      <React.Fragment>
        {
          obj.map(item => 
            <React.Fragment>
              <div key={item.code} style={{padding:21}}>
                <h5>Code: {item.code}</h5>
                <h6>Name: {item.name}</h6>
                <Button variant="danger" onClick={() => deleteCode(item.code)}>Delete</Button>
              </div>
            </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  function timer({obj})
  {
    console.log(obj);
    Object.keys(obj).forEach((key) => {
      if(typeof obj[key] == "number")
      {
        obj[key] = generateCode();
      }
    })
  }

  return (
    <React.Fragment>
    <div style={{ display: 'block', 
                  width: 700, 
                  padding: 30 }}>
      <h4>Authenticator</h4>
      <Form onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Label>Enter name:</Form.Label>
          <Form.Control  
            type="text"
            placeholder="Enter name"
            name="name"
          />
          <Form.Control  
            type="hidden"
            name="code"
            value={code}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="Submit" onClick={generateCode}>
           Create code
        </Button>
      </Form>
    </div>
    <div>
      <CodesList obj={objData}/>
      {/* {
        window.setInterval(function()
        {
          timer()
        },1000)
      } */}
    </div>
    </React.Fragment>
  );
}
