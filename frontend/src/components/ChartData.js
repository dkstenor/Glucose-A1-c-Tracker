import React from 'react';
import { Container, Row, Col, Button, Table } from "reactstrap";
import PageHeader from './PageHeader';

function ChartData (props) {

    function tConv24(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      };

    return (
        <React.Fragment>
            <PageHeader>Display Data for [date]</PageHeader>
            <Container>
                <Row>
                    <Col md={4}>
                        <Table responsive striped size='sm' bordered id='readingTable'>
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
                                {props.data.map(dataItem => 
                                <tr>
                                    <td>{tConv24(dataItem.reading_time)}</td>
                                    <td>{dataItem.my_reading}</td>
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

export default ChartData;