import React, {Component} from "react";
import './EmployerSignupTab.css';
import {Button, Form, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class EmployerSignupTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            companyName: "",
            companyCVR: ""
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleUsernameNameChange = (event) => {
        this.setState({
            userName: event.target.value
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

    handleCompanyCvrChange = (event) => {
        this.setState({
            companyCVR: event.target.value
        })
    }

    handleSubmit = event => {
        performHTTPRequest(this.state.email, this.state.password, this.state.confirmPassword, this.state.companyName)
    }

    render() {
        return (
            <div>
                <Container className="LoginForm">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Company name</Form.Label>
                                    <Form.Control type="text" value={this.state.companyName} placeholder="Enter company name" onChange={this.handleCompanyNameChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Company CVR</Form.Label>
                                    <Form.Control type="number" maxLength={8} value={this.state.companyCVR} placeholder="Enter company cvr" onChange={this.handleCompanyCvrChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleEmailChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={this.state.userName} placeholder="Enter username" onChange={this.handleUsernameNameChange} />
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

                        <Button onClick={() => performHTTPRequest(this.state.email, this.state.password, this.state.confirmPassword, this.state.companyName, this.state.userName)} variant="primary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

async function performHTTPRequest(email, password, confirmPassword, companyName, userName) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Companies', {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            companyName: companyName,
            userName: userName
        }).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
}

export default EmployerSignupTab;
