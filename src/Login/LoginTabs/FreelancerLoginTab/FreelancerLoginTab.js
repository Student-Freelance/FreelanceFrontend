import React from "react";
import './FreelancerLoginTab.css';
import {Tab, Tabs, Button, Form, Dropdown} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function FreelancerLoginTab() {
    return (
        <div>
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
            <Container className="LoginDivider">
                <Dropdown.Divider />
            </Container>
            <Container>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me?" />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg" block>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default FreelancerLoginTab;
