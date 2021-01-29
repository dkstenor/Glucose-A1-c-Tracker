import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import PageHeader from './PageHeader';

function ReadingPage() {

return (
    <React.Fragment>
    <PageHeader>
            Glucose Readings
        </PageHeader>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Add Reading</CardTitle>
                            <CardText>Add glucose readings to the database</CardText>
                            {/* <Button className="btn btn-primary mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeAdd}>Add</Button> */}
                            </CardBody>
                            <Link
                                to="/addreading"
                                className="btn btn-primary mx-auto mb-3"
                                variant="outline-dark"
                                style={{ backgroundColor: "lavender", color: "black" }}
                                >Select Date
                            </Link>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Display Readings</CardTitle>
                            <CardText>Display readings from the database</CardText>
                            {/* <Button className="btn btn-primary mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeDisplay}>Display</Button> */}
                        </CardBody>
                            <Link
                                to="/viewreadings"
                                className="btn btn-primary mx-auto mb-3"
                                variant="outline-dark"
                                style={{ backgroundColor: "lavender", color: "black" }}
                                >Select Date
                            </Link>
                    </Card>
                </Col>
            </Row>
      </Container>
    </React.Fragment>
    )
}

export default ReadingPage;