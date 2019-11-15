import React, {Component} from "react";
import './FreelancerSignupTab.css';
import {Button, Col, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {AxiosAgent} from "../../../Shared/Web/AxiosAgent";
import {withAuth} from "react-auth-guard";

class FreelancerSignupTab extends Component {
    state = {
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""

    };

    constructor(props) {
        super(props);
        this.auth = props.auth;
        this.axiosagent = new AxiosAgent();
    }

    handleChange = e => {
        console.log([e.target.name] + "new value", e.target.value);
        this.setState({[e.target.name]: e.target.value})
    };
    handleSubmit = (e) => {
        const body = this.state;
        e.preventDefault();
        this.axiosagent.Post("Students",
            {
                ...body
            }).then(result => {
            this.auth.updateToken(result.data.token)
        }).catch(error => {
                console.log(error)
            }
        )
    };

    render() {
        const {
            email, userName, password, confirmPassword, firstName, lastName
        }
            = this.state;
        return (
            <div>
                <Container className="LoginForm">
                    <Form>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" value={firstName} name="firstName"
                                                  placeholder="Enter first name" onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" value={lastName} name="lastName"
                                                  placeholder="Enter last name"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} name="email" placeholder="Enter email"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userName} name="userName" placeholder="Enter username"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} name="password"
                                                  placeholder="Enter password" onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" value={confirmPassword} name="confirmPassword"
                                                  placeholder="Re-enter password" onChange={this.handleChange}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Button
                            onClick={(e) => this.handleSubmit(e)}
                            variant="primary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withAuth(FreelancerSignupTab);
