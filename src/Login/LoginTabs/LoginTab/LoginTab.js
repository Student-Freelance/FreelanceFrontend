import React, {Component} from "react";
import './LoginTab.css';
import {Button, Dropdown, Form, Row} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {GoogleLogin} from 'react-google-login';
import Axios from "axios";

class LoginTab extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    googleResponse = (e) => { console.log(e)
    };
    onFailure = (error) => {
        alert(error);
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

    showSignupFormPage() {
        //this.setState({ showSignupForm: true});
    }


    render() {

        return (
            <div>
                <Container className="LoginForm">
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Control type="username" value={this.state.username} placeholder="Enter username"
                                          onChange={this.handleUsernameNameChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" value={this.state.password} placeholder="Enter password"
                                          onChange={this.handlePasswordChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me?"/>
                        </Form.Group>
                        <Button onClick={() => performHTTPRequest(this.state.userName, this.state.password)}
                                variant="primary" type="submit" size="lg" block>
                            Sign in
                        </Button>
                        <Button onClick={this.showSignupFormPage} variant="secondary" type="submit" size="lg" block>
                            Sign up
                        </Button>
                    </Form>
                </Container>
                <Container className="LoginDivider">
                    <Dropdown.Divider/>
                </Container>
                <Container>
                            <GoogleLogin
                                         clientId= {process.env.GoogleID}
                                         buttonText="Login"
                                         onSuccess={this.googleResponse}
                                         onFailure={this.googleResponse}
                            />
                </Container>
            </div>
        )
        /*
        return { this.state.showSignupForm ? signupForm : loginForm };*/
    }
}

async function performHTTPRequest(username, password) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Account/Login', {
            userName: username,
            password: password
        }).then(res => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token)
    }).catch(error => {
        console.log(error)
    })
}

export default LoginTab;
