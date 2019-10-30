import React from "react";
import './FreelancerLoginTab.css';
import {Tab, Tabs, Button, Form, Dropdown} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

function FreelancerLoginTab() {
    return (
        <div>
            <Container className="LoginForm">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me?" />
                    </Form.Group>
                    <Button onClick={() => performHTTPRequest()} variant="primary" type="submit" size="lg" block>
                        Sign in
                    </Button>
                    <Button variant="secondary" type="submit" size="lg" block>
                        Sign up
                    </Button>
                </Form>
            </Container>
            <Container className="LoginDivider">
                <Dropdown.Divider />
            </Container>
            <Container className="LoginButtons">
                <Button variant="dark" size="lg" block>
                    Freelancer button 1
                </Button>
                <Button variant="dark" size="lg" block>
                    Freelancer button 2
                </Button>
                <Button variant="dark" size="lg" block>
                    Freelancer button 3
                </Button>
            </Container>
        </div>
    )
}

async function performHTTPRequest() {
    const response = await Axios.get("https://cvrapi.dk/api?vat=28983379&country=dk")
    console.log(response.data)
}

export default FreelancerLoginTab;
