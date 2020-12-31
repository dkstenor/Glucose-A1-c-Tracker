import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import PageHeader from './PageHeader';

function RegisterPage() {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const [errorMsg, setErrorMsg] = useState({
        errorNo: '',
        errorText: ''
    })
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
      }
      function handleResponse(response) {
            if (response.status === 200)
                localStorage.setItem('isLoggedIn', 'True');
                localStorage.setItem('username', formData.username);
            setFormData({
                fname: '',
                lname: '',
                email: '',
                username: '',
                password: '',
                password2: ''
            });
      }

      function handleSubmit(event) {
        event.preventDefault();
        axios.post('/register', {
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            password2: formData.password2
          })
          .then(handleResponse)
          .catch(error => {
              setErrorMsg({
                  errorNo: error.response.status,
                  errorText: error.response.data.message
              });
          })
        }

        if (localStorage.getItem('isLoggedIn')) {
            return (
                <Redirect to='/readingpage' />
            )
        }
          
    return (
        <React.Fragment>
        <PageHeader>
            Sign Up
        </PageHeader>
        <Container  className="mt-5 w-25 p-3 mr-3px">
        <Form onSubmit={handleSubmit} autoComplete="off">
            <FormText>
                <h3 style={{color: 'red'}}>{errorMsg.errorText}</h3>
            </FormText>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="fname">First Name</Label>
                    <Input type="text" name="fname" id="fname" value={formData.fname} onChange={handleChange}/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="lname">Last Name</Label>
                    <Input type="text" name="lname" id="lname" value={formData.lname} onChange={handleChange}/>
                </FormGroup>
                </Col>
            </Row>   
            <Row form>
                <Col>
                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange}/>
                </FormGroup>
                </Col>
             </Row>
             <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="password2">Verify Password</Label>
                    <Input type="password" name="password2" id="password2" value={formData.password2} onChange={handleChange}/>
                </FormGroup>
                </Col>
            </Row>   
            <Row>
                <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} type="submit">
                    Sign Up
                </Button>
            </Row>
        </Form>
        </Container>
        </React.Fragment>
    )
}

export default RegisterPage;