import React, {Component} from "react";
import './EmployerSignupTab.css';
import {Button, Col, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {AxiosAgent} from "../../../Shared/Web/AxiosAgent";
import {withAuth} from "react-auth-guard";

class EmployerSignupTab extends Component {
    constructor(props) {
        super(props);
        this.auth = props.auth;
        this.state = {
            companyreg: {
                email: "",
                userName: "",
                password: "",
                confirmPassword: "",
                companyName: "",
                vat: ""
            }
        }
    }

    handleChange = event => {
        const {companyreg} = this.state;
        companyreg[event.target.name] = event.target.value;
        this.setState({companyreg});
    };

    handleSubmit = e => {
        const {companyreg} = this.state;

        e.preventDefault();
        AxiosAgent.Post("Companies",
            {...companyreg}
        ).then(result => {
            this.auth.updateToken(result.data.token)


        }).catch(error => {
                console.log(error)

            }
        )
    };

    render() {
        const {
            companyreg: {email, userName, password, confirmPassword, companyName, vat}
        } = this.state;
        return (
            <div>
                <Container className="LoginForm">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Company name</Form.Label>
                                    <Form.Control type="text" value={companyName} placeholder="Enter company name"
                                                  name="companyName" onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Company CVR</Form.Label>
                                    <Form.Control type="number" maxLength={8} value={vat} name="vat"
                                                  placeholder="Enter company cvr"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} placeholder="Enter email" name="email"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userName} placeholder="Enter username" name="userName"
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
                                                  placeholder="Re-enter password"
                                                  onChange={this.handleChange}/>
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

export default withAuth(EmployerSignupTab);
