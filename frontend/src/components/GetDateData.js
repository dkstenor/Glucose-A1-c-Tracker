import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from "reactstrap";
import DatePicker from "react-date-picker";
import PageHeader from './PageHeader';
import ChartData from './ChartData';

function GetDateData () {

    const [dateValue, onDateChange] = useState(new Date());

    const [data, setData] = useState([]);

    const [errorMsg, setErrorMsg] = useState({
        errorNo: '',
        errorText: ''
    })

    function handleResponse(response) {
        setErrorMsg({
            errorNo: '',
            errorText: ''
        });
        setData(response.data)
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/getdatedata', {
            username: sessionStorage.getItem('username'),
            date: dateValue
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
            <PageHeader>Glucose Readings</PageHeader>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col md={4}><h3 style={{ color: "red" }}>{errorMsg.errorText}</h3></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={4}>
                        
                            Choose Date:<br />
                            <DatePicker onChange={onDateChange} value={dateValue} />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                <br />
                    <Row>
                        <Col></Col>
                        <Col md={4}>
                            <Button
                                    className="mx-auto mb-3"
                                    variant="outline-dark"
                                    style={{ backgroundColor: "lavender", color: "black" }}
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Get Reading Data
                                </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            <ChartData data={data} />
    </React.Fragment>
    );
}

export default GetDateData;