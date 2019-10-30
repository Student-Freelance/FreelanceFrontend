import React from "react";
import './EmployerSignupTab.css';
import {Button, Form, Col, Dropdown, Card} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

function EmployerSignupTab() {
    return (
        <div>
            <Container className="LoginForm">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
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

                    <Form.Group controlId="formCompanyName">
                        <Form.Label>Company name</Form.Label>
                        <Form.Control type="text" placeholder="Enter company name" />
                    </Form.Group>

                    <Button onClick={() => performHTTPRequest()} variant="primary" type="submit" size="lg" block>
                        Sign up
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

async function performHTTPRequest() {
    const response = await Axios.get("https://cvrapi.dk/api?vat=28983379&country=dk")
    console.log(response.data)
}

export default EmployerSignupTab;
