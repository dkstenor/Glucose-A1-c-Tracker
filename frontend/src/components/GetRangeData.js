import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container, Row, Col, Button } from "reactstrap";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import PageHeader from './PageHeader';
import MakeRangeTable from './MakeRangeTable';
import MakeRangeAverage from './MakeRangeAverage';
import MakeRangeChart from './MakeRangeChart';
import NewReading from './NewReading';

function GetRangeData () {

    const [dateValue, onDateChange] = useState([new Date(), new Date()]);

    const [data, setData] = useState({
        ret: [],
        day_avg: 0
    });
    
    const [isClicked, setIsClicked] = useState(false);

    const [errorMsg, setErrorMsg] = useState({
        errorNo: '',
        errorText: ''
    })

    function handleResponse(response) {
        setData(response.data)
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsClicked(true);
        axios.get('/getrangedata', {
            params: {
            username: sessionStorage.getItem('username'),
            startdate: dateValue[0],
            enddate: dateValue[1]
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
                    <PageHeader>Glucose Readings for {moment(dateValue[0]).format('MM/DD/YYYY')} - {moment(dateValue[1]).format('MM/DD/YYYY')}</PageHeader>
                <Container>
                    <h3 style={{ color: "red", textAlign: "center" }}>{errorMsg.errorText}</h3>
                    <Row>
                        <Col></Col>
                        <Col>
                            {console.log(data)}
                            <MakeRangeTable data={data} />
                        </Col>
                        <Col>
                            <MakeRangeAverage data={data} />
                            <br />
                            <NewReading />
                        </Col>
                        </Row>
                        </Container>
                        <MakeRangeChart data={data} />
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
                            <DateRangePicker onChange={onDateChange} value={dateValue} />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                <br />
                    <Row>
                        <Col></Col>
                        <Col md={4}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                    size = "md"
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

export default GetRangeData;