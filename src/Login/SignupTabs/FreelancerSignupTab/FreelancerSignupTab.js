import React, {Component} from "react";
import './FreelancerSignupTab.css';
import {Button, Form, Col, Modal} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class FreelancerSignupTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: ""
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

    handleUsernameNameChange = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleSubmit = event => {
        performHTTPRequest(this.state.email, this.state.userName, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName)
    }

    render() {
        return (
            <div>
                <Container className="LoginForm">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" value={this.state.firstName} placeholder="Enter first name" onChange={this.handleFirstNameChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" value={this.state.lastName} placeholder="Enter last name" onChange={this.handleLastNameChange} />
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
                                    <Form.Control type="password" value={this.state.confirmPassword}  placeholder="Re-enter password" onChange={this.handleConfirmPasswordChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Button onClick={() => performHTTPRequest(this.state.email, this.state.userName, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName)} variant="primary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

function showModalSuccess() {
    return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
    )
}

function showModalError() {
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

async function performHTTPRequest(email, userName, password, confirmPassword, firstName, lastName) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/User/RegisterStudent', {
            email: email,
            userName: userName,
            password: password,
            confirmPassword: confirmPassword,
            firstName: firstName,
            lastName: lastName
        })
        .then(res => {
            showModalSuccess()
            console.log(res.data)
        })
        .catch(error => {
            showModalError()
            console.log(error)
        })
}

export default FreelancerSignupTab;
