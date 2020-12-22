import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, Button, Container, Row } from 'reactstrap';
import axios from 'axios';
import PageHeader from './PageHeader';

function LoginPage() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
                sessionStorage.setItem('loggedin', 'True');
            setFormData({
                username: '',
                password: ''
            });
      }

      function handleSubmit(event) {
        event.preventDefault();
        axios.post('/login', {
            username: formData.username,
            password: formData.password
          })
          .then(handleResponse)
          .catch(error => {
              setErrorMsg({
                  errorNo: error.response.status,
                  errorText: error.response.data.message
              });
          })
        }
          
    if (sessionStorage.getItem('loggedin')) {
        return (
            <Redirect to='/landingpage' />
        )
    }
    return (
      <React.Fragment>
        <Container  className="mt-5 w-25 p-3 mr-3px">
        <Form onSubmit={handleSubmit} autoComplete="off">
            <FormText>
                <h3 style={{color: 'red'}}>{errorMsg.errorText}</h3>
            </FormText>
            <FormGroup style={{textAlign: "left"}} id="username">
                <Label>Username</Label>
                <Input style={{width: "95%"}} placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
            </FormGroup>

            <FormGroup style={{textAlign: "left"}} id="password">
                <Label>Password</Label>
                <Input style={{width: "95%"}} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </FormGroup>
            <Row>
            <Button className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}} type="submit">
                Submit
            </Button>
            </Row>
            <FormText className="text-muted">
                Don't have an Account?  Click <a href="/adduser" active>here</a> to sign up.
            </FormText>
        </Form>
        </Container>
        </React.Fragment>
    )
}

export default LoginPage;