import React, {Component} from "react";
import './LoginTab.css';
import {Button, Dropdown, Form, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {AxiosAgent} from "../../../Shared/Web/AxiosAgent";
import GoogleLogin from "react-google-login";
import {withAuth} from "react-auth-guard";

class LoginTab extends Component {
    ClientID = "908937238247-c2fr5ag4d8vi7tcd5m8cssa0pffaiccp.apps.googleusercontent.com";

    constructor(props) {
        super(props);
        this.auth = props.auth;
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
                this.auth.updateToken(result.data.token)
            }
        });

    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.axiosagent.Post("Account/Login", {
            userName: this.state.userName,
            password: this.state.password
        }).then(result => {
            this.auth.updateToken(result.data.token)


        }).catch(error => {
                console.log(error)

            }
        )
    };
    handleInsideDTUSubmit = (e) => {
        const currentURL = "freelance-portal.herokuapp.com";//window.location.href

        e.preventDefault();
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

    redirectToAuthDTU() {
        this.window.location.href = "https://auth.dtu.dk/dtu/?service=freelance-portal.herokuapp.com";
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
                        <Button onClick={(e) => this.handleSubmit(e)}
                                variant="primary" type="submit" size="lg" block>
                            Sign in
                        </Button>
                    </Form>
                </Container>
                <Container className="LoginDivider">
                    <Dropdown.Divider/>
                </Container>
                <Container>
                    <Form.Row>
                        <Col>
                            <GoogleLogin autoLoad={false}
                                         clientId={this.ClientID}
                                         buttonText="Sign in with Google"
                                         onSuccess={this.responseGoogle}
                                         onFailure={this.responseGoogle}
                            />
                        </Col>
                        <Col>
                            {/*<Button onClick={(e) => this.handleInsideDTUSubmit(e)}*/}
                            <Button onClick={this.redirectToAuthDTU.bind(this)}
                                    variant="danger" type="submit" size="lg" block>
                                Sign in with DTU Inside
                            </Button>
                        </Col>
                    </Form.Row>
                </Container>
            </div>
        )
    }
}

export default withAuth(LoginTab);
