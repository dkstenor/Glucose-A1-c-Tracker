import React, { useState } from 'react';
import { Form, FormText, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import DatePicker from "react-date-picker";
import TimePicker from 'react-time-picker';
import PageHeader from './PageHeader';

function AddReading() {

    const [formData, setFormData] = useState({
        reading: '',
        readingDate: '',
        readingTime: ''
    });

    const [errorMsg, setErrorMsg] = useState({
        errorNo: '',
        errorText: ''
    })

    const [msg, setMsg] = useState('')

    const [dateValue, onDateChange] = useState(new Date());

    const [timeValue, onTimeChange] = useState('10:00 AM');
    
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
      }
      function handleResponse() {
        setMsg('Reading Added');
        setFormData({
            reading: '',
            readingDate: ''
});
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        setErrorMsg({
            errorNo: '',
            errorText: ''
        })
        axios.post('/addreading', {
            username: sessionStorage.getItem('username'),
            reading: formData.reading,
            readingDate: dateValue,
            readingTime: timeValue
          })
          .then(handleResponse)
          .catch(error => {
              setErrorMsg({
                  errorNo: error.response.status,
                  errorText: error.response.data.message
              });
          })
        }
    
    return (
      <React.Fragment>
        <PageHeader>Add Glucose Readings</PageHeader>
        <Container fluid className="mt-5 w-25 p-3 mr-3px ml-0px">
          <Form onSubmit={handleSubmit} autoComplete="off">
            <FormText>
              <h3 style={{ color: "red" }}>{errorMsg.errorText}</h3>
            </FormText>
            <FormText>
              <h3 style={{ color: "green" }}>{msg}</h3>
            </FormText>
            <FormGroup style={{ textAlign: "left" }} id="reading">
              <Label>Reading</Label>
              <Input
                autoFocus={true}
                style={{ width: "95%" }}
                placeholder="Glucose Reading"
                name="reading"
                value={formData.reading}
                onChange={handleChange}
              />
            </FormGroup>
                <Row>
                    <Col md={4}>
                        <Label>Reading Date</Label> <br />
                        <DatePicker onChange={onDateChange} value={dateValue} />
                    </Col>
                    <Col md={3}></Col>
                    <Col md={5}>
                        <Label>Reading Time</Label> <br />
                        <TimePicker onChange={onTimeChange} value={timeValue} disableClock={true}/>
                    </Col>
                </Row>
           <br />
            <Row>
              <Button
                className="mx-auto mb-3"
                variant="outline-dark"
                style={{ backgroundColor: "lavender", color: "black" }}
                type="submit"
              >
                Submit
              </Button>
            </Row>
          </Form>
        </Container>
      </React.Fragment>
    );
    }


export default AddReading;