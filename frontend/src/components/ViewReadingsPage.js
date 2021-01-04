import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import PageHeader from './PageHeader';

function ViewReadingsPage() {

    const history = useHistory();

    function routeDate() { 
        history.push('/getdatedata');
    }

    function routeRange() {
        history.push('/getrangedata');
    }


    return (
        <React.Fragment>
        <PageHeader>
                Display Glucose Readings
            </PageHeader>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">View Single Day</CardTitle>
                                <CardText>View glucose readings from a single day.  This options displays a table of readings and a graph of your readings from the selected day.<br /><br /><br /></CardText>
                            </CardBody>
                            <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeDate} type="submit">
                                Select Day
                            </Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Display Date Range</CardTitle>
                                <CardText>View glucose readings from a selected date range.  This option displays a table showing your average glucose reading for each day in
                                    the selected range and a graph of these averages.  In addition, the approximate A1C value computed from the selected range will be displayed. </CardText>
                            </CardBody>
                            <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeRange} type="submit">
                                Select Range
                            </Button>
                        </Card>
                    </Col>
                </Row>
        </Container>
        </React.Fragment>
        )
}

export default ViewReadingsPage;