import React, {Component} from "react";
import './FreelancerSignupTab.css';
import {Tab, Tabs, Button, Form, Dropdown, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class FreelancerSignupTab extends Component {

    constructor(props) {
        super(props);

        /*
        this.state = {
            showSignupForm: false
        };*/
    }

    showSignupFormPage() {
        //this.setState({ showSignupForm: true});

    }

    render() {
        /*
        const signupForm = (
            <p>HELLO</p>
        );*/

        const loginForm = (
            <div>
                <Container className="LoginForm">
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" />
                            </Col>
                            <Col>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Col>
                                <Col>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Re-enter password" />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Button onClick={() => performHTTPRequest()} variant="primary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </div>
        );

        return loginForm
        /*
        return { this.state.showSignupForm ? signupForm : loginForm };*/
    }
}

async function performHTTPRequest() {
    const response = await Axios.get("https://cvrapi.dk/api?vat=28983379&country=dk")
    console.log(response.data)
}

export default FreelancerSignupTab;
