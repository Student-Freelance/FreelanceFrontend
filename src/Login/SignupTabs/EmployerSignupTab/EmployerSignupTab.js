import React from "react";
import './EmployerSignupTab.css';
import {Tab, Tabs, Button, Form, Dropdown, Card} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function EmployerSignupTab() {
    return (
        <div>
            <Container className="LoginForm">
                <Card>
                    <Card.Header as="h5">Sign in with mail</Card.Header>
                    <Card.Body>
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
                            <Button variant="primary" type="submit" size="lg" block>
                                Sign in
                            </Button>
                            <Button variant="secondary" type="submit" size="lg" block>
                                Sign up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="LoginDivider"></Container>
            <Container className="LoginButtons">
                <Card>
                    <Card.Header as="h5">Sign in with third parties</Card.Header>
                    <Card.Body>
                        <Button variant="dark" size="lg" block>
                            Freelancer button 1
                        </Button>
                        <Button variant="dark" size="lg" block>
                            Freelancer button 2
                        </Button>
                        <Button variant="dark" size="lg" block>
                            Freelancer button 3
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>

    )
}

export default EmployerSignupTab;
