import React, {Component} from "react";
import './EmployerSignupTab.css';
import {Button, Form, Col, Dropdown, Card} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class EmployerSignupTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            companyName: ""
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleCompanyNameChange = (event) => {
        this.setState({
            companyName: event.target.value
        })
    }

    handleSubmit = event => {

    }

    render() {
        return (
            <div>
                <Container className="LoginForm">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleEmailChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={this.state.password} placeholder="Enter password" onChange={this.handlePasswordChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" value={this.state.confirmPassword} placeholder="Re-enter password" onChange={this.handleConfirmPasswordChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control type="text" value={this.state.companyName} placeholder="Enter company name" onChange={this.handleCompanyNameChange} />
                        </Form.Group>

                        <Button onClick={() => performHTTPRequest()} variant="primary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

async function performHTTPRequest() {
    const response = await Axios.get("https://cvrapi.dk/api?vat=28983379&country=dk")
    console.log(response.data)
}

export default EmployerSignupTab;
