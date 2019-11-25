import React, {useState} from "react";
import './EmployerSignupTab.css';
import {Button, Col, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../../../../index";
import {withRouter} from "react-router-dom";

const EmployerSignupTab = (props) => {
    const {userStore} = useStores();
    const [form, setState] = useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        vat: ""
    });
    const handleChange = event => {
        setState({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        userStore.registerCompany({...form}).finally(() => {
            userStore.loadingUser = false;
            props.history.push("/")
        })
    };
    return (
        <div>
            <Container className="LoginForm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>Company name</Form.Label>
                                <Form.Control type="text" value={form.companyName} placeholder="Enter company name"
                                              name="companyName" onChange={handleChange}/>
                            </Col>
                            <Col>
                                <Form.Label>Company CVR</Form.Label>
                                <Form.Control type="number" maxLength={8} value={form.vat} name="vat"
                                              placeholder="Enter company cvr"
                                              onChange={handleChange}/>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={form.email} placeholder="Enter email" name="email"
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={form.userName} placeholder="Enter username" name="userName"
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
                                              placeholder="Re-enter password"
                                              onChange={handleChange}/>
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

export default withRouter(observer(EmployerSignupTab));
