import React, { Component } from "react";
import './EmployerLoginTab.css';
import {Tab, Tabs, Button, Form, Dropdown, Card} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class EmployerLoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: ""
        }
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

    handleSubmit = event => {
        performHTTPRequest(this.state.userName, this.state.password)
    }

    showSignupFormPage() {
        //this.setState({ showSignupForm: true});
    }

    render() {
        return (
            <div>
                <Container className="LoginForm">
                    <Card>
                        <Card.Header as="h5">Sign in with mail</Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control type="username" value={this.state.userName} placeholder="Enter username" onChange={this.handleUsernameNameChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" value={this.state.password} placeholder="Enter password" onChange={this.handlePasswordChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me?" />
                                </Form.Group>
                                <Button onClick={() => performHTTPRequest(this.state.userName, this.state.password)} variant="primary" type="submit" size="lg" block>
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
        );
    }
}

async function performHTTPRequest(username, password) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Login/Login', {
            userName: username,
            password: password
        }).then(res => {
        console.log(res.data)
    }).catch(error => {
        console.log(error)
    })
}

export default EmployerLoginTab;
