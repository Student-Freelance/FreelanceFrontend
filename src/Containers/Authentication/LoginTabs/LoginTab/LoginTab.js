import React, {useState} from "react";
import './LoginTab.css';
import {Button, Col, Dropdown, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import GoogleLogin from "react-google-login";
import {withRouter} from "react-router-dom"
import {observer} from "mobx-react";
import {useStores} from "../../../../index";


const LoginTab = (props) => {
    const ClientID = "908937238247-c2fr5ag4d8vi7tcd5m8cssa0pffaiccp.apps.googleusercontent.com";
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {userStore, authStore} = useStores();

    const responseGoogle = (response) => {
        userStore.googlelogin({access_token: response.Zi.id_token}).then(result => {
            if (!result.isEmpty) {
                authStore.setToken(result.token);
                userStore.pullUser();
                props.history.push("/")
            }
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        userStore.login(userName, password).finally(()=>{
            userStore.loadingUser = false;
            props.history.push("/")
        })
    };

    const handleUsernameNameChange = (event) => {

        setUserName(event.target.value)

    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const redirectToAuthDTU = () => {
        window.location.href = "https://devops01.eitlab.diplom.dtu.dk/api/Account/CampusNetLogin";
        // "https://localhost:5001/api/Account/CampusNetLogin";

    };


    return (
        <div>
            <Container className="LoginForm">
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control type="username" value={userName} placeholder="Enter username"
                                      onChange={handleUsernameNameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" value={password} placeholder="Enter password"
                                      onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me?"/>
                    </Form.Group>
                    <Button onClick={(e) => handleSubmit(e)}
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
                                     clientId={ClientID}
                                     buttonText="Sign in with Google"
                                     onSuccess={responseGoogle.bind(this)}
                                     onFailure={responseGoogle.bind(this)}
                        />
                    </Col>
                    <Col>
                        {<Button onClick={redirectToAuthDTU.bind(this)}
                                 variant="danger" type="submit" size="md" block>
                            Sign in with DTU Inside
                        </Button>}
                    </Col>
                </Form.Row>
            </Container>
        </div>

    )

};
export default withRouter(observer(LoginTab));
