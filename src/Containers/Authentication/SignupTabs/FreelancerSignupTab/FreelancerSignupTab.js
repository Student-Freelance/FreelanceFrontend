import React, {useState} from "react";
import './FreelancerSignupTab.css';
import {Button, Col, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {useStores} from "../../../../index";


const FreelancerSignupTab = (props) => {
    const {userStore} = useStores();
    const [form, setState] = useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });
    const handleChange = event => {
        setState({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        userStore.registerStudent({...form}).finally(() => {
            userStore.loadingUser = false;
            props.history.push("/")
        })
    };
    return (
        <div>
            <Container className="LoginForm">
                <Form>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" value={form.firstName} name="firstName"
                                              placeholder="Enter first name" onChange={handleChange}/>
                            </Col>
                            <Col>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" value={form.lastName} name="lastName"
                                              placeholder="Enter last name"
                                              onChange={handleChange}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={form.email} name="email" placeholder="Enter email"
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={form.userName} name="userName" placeholder="Enter username"
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={form.password} name="password"
                                              placeholder="Enter password" onChange={handleChange}/>
                            </Col>
                            <Col>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" value={form.confirmPassword} name="confirmPassword"
                                              placeholder="Re-enter password" onChange={handleChange}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Button
                        onClick={(e) => handleSubmit(e)}
                        variant="primary" type="submit" size="lg" block>
                        Sign up
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default withRouter(observer(FreelancerSignupTab));
