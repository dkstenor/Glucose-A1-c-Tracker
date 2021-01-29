import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container, Row, Col, Button } from "reactstrap";
import DatePicker from "react-date-picker";
import PageHeader from './PageHeader';
import MakeTable from './MakeTable';
import MakeAverage from './MakeAverage';
import MakeChart from './MakeChart';
import NewReading from './NewReading';

function GetDateData () {

    const [dateValue, onDateChange] = useState(new Date());

    const [data, setData] = useState({
        ret: [],
        avg: 0
    });

    const [isClicked, setIsClicked] = useState(false);

    const [errorMsg, setErrorMsg] = useState({
        errorNo: '',
        errorText: ''
    })

    function handleResponse(response) {
        // setErrorMsg({
        //     errorNo: '',
        //     errorText: ''
        // });
        setData(response.data)
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsClicked(true);
        axios.get('/getdatedata', {
            params: {
                username: sessionStorage.getItem('username'),
                date: dateValue 
            }
          })
          .then(handleResponse)
          .catch(error => {
              setErrorMsg({
                  errorNo: error.response.status,
                  errorText: error.response.data.message
              });
          })
        }
        if(isClicked) {
            return(
                <React.Fragment>

                    <PageHeader>Glucose Readings for {moment(dateValue).format('MM/DD/YYYY')}</PageHeader>
                <Container>
                    <h3 style={{ color: "red", textAlign: "center" }}>{errorMsg.errorText}</h3>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={3}>
                            <MakeTable data={data} />
                        </Col>
                        <Col md={4}>
                            <MakeAverage data={data} /><br />
                            <NewReading />
                        </Col>
                        <Col md={4}></Col>
                        </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col md={2}></Col>
                                <Col>
                                    <MakeChart data={data} />
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Container>
                        
            </React.Fragment>
            )
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
    </React.Fragment>
    );
}

export default GetDateData;