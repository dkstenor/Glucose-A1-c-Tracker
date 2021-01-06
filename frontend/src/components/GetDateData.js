import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from "reactstrap";
import DatePicker from "react-date-picker";
import PageHeader from './PageHeader';

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
                <Container>
                    <Row>
                        <Col md={4}>
                            <Table responsive striped size='sm' bordered>
                                <thead>
                                    <tr>
                                        <th>
                                            Reading Time
                                        </th>
                                        <th>
                                            Reading
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(data => 
                                    <tr>
                                        <td>{data.reading_time}</td>
                                        <td>{data.my_reading}</td>
                                    </tr>
                                    )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={2}>
                            Average:
                        </Col>
                        <Col>Chart goes here</Col>
                    </Row>
                </Container>
    </React.Fragment>
    );
}

export default GetDateData;