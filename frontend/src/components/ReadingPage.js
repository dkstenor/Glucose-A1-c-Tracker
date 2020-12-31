import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import PageHeader from './PageHeader';

function ReadingPage() {

    const history = useHistory();

    function routeAdd() { 
        history.push('/addreading');
    }

    function routeDisplay() {
        history.push('/viewreadings');
    }

  
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
                            <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeAdd}>Add</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Display Readings</CardTitle>
                            <CardText>Display readings from the database</CardText>
                            <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} onClick={routeDisplay}>Display</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
      </Container>
    </React.Fragment>
    )
}

export default ReadingPage;