import React, {Component} from "react";
import './LoginTab.css';
import {Button, Dropdown, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {GoogleLogin} from 'react-google-login';
import Axios from "axios";
import {AxiosAgent} from "../../../Shared/Web/AxiosAgent";
import {withRouter} from "react-router-dom";

class LoginTab extends Component {
    ClientID = "908937238247-c2fr5ag4d8vi7tcd5m8cssa0pffaiccp.apps.googleusercontent.com";

    constructor(props) {
        super(props);
        this.axiosagent = new AxiosAgent();
        this.responseGoogle = this.responseGoogle.bind(this);
        this.state = {
            userName: "",
            password: ""
        }
    }

    responseGoogle = (response) => {
        this.axiosagent.Post('Account/GoogleAuth', {access_token: response.Zi.id_token}).then(result => {
            if (!result.isEmpty) {
                localStorage.setItem('token', result.data.token);
                this.props.history.push('/landingpage');
            }
        });

    };

    handleUsernameNameChange = (event) => {
        this.setState({
            userName: event.target.value
        })
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    };

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
                    <GoogleLogin autoLoad={false}
                                 clientId={this.ClientID}
                                 buttonText="Login"
                                 onSuccess={this.responseGoogle}
                                 onFailure={this.responseGoogle}
                    />
                </Container>
            </div>
        )
    }
}

async function performHTTPRequest(username, password) {
    await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Account/Login', {
            userName: username,
            password: password
        }).then(res => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token)
    }).catch(error => {
        console.log(error)
    });
}

export default withRouter(LoginTab);
