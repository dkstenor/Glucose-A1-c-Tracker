import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PageHeader from './PageHeader';
// import diabetesImage from '../public/images/diabetes.jpg';

function HomePage(){
    
    return(
        <React.Fragment>
        <PageHeader>
            Welcome
        </ PageHeader>
            <Container fixed>
                <Row>
                    <Col>
                        <p style={{fontSize: "20px"}}>For someone with diabetes, there are two numbers that you must know:  your average glucose and your A1C.  
                        This site will help you keep track of both.  Simply log in (after you create an account) and you can enter your daily 
                        glucose readings and generate a visual representation of your daily readings.  For a broader look at your daily patterns, 
                        specify a date range and you will see your average reading for each day in the range along with a visual representation.</p>
                        <br />
                        <p style={{fontSize: "20px"}}><u>Important</u>:  The information displayed here is for informational purposes only.  Consult with your physician before 
                        making any changes in your treatment.</p>
                    </Col>
                    <Col>
                        <img src = 'images/diabetes.jpg' class="img-thumbnail" alt="Syringe" />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default HomePage;