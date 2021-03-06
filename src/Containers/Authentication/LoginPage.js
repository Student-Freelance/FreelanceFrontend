import React from "react";
import './LoginPage.css';
import {Tab, Tabs} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import LoginTab from "./LoginTab/LoginTab";
import EmployerSignupTab from "./SignupTabs/EmployerSignupTab/EmployerSignupTab";
import FreelancerSignupTab from "./SignupTabs/FreelancerSignupTab/FreelancerSignupTab";
import ClipLoader from "react-spinners/ClipLoader";
import {observer} from "mobx-react";
import {useStores} from "../../index";


const LoginPage = () => {
    const {userStore} = useStores();

    return (
        userStore.loadingUser? <div className='sweet-loading, LoaderMargins'
            >
            <ClipLoader
                size={150} // or 150px
                color={'#123abc'}
            />
        </div>:
        <div className="LoginMargins">
            <Container className="LoginTitle">
                <h1>Login</h1>
            </Container>

            <Container className="LoginCard">
                <Tabs defaultActiveKey="loginEmployerAndFreelancer" id="uncontrolled-tab-example">
                    <Tab eventKey="loginEmployerAndFreelancer" title="Login">
                        <LoginTab/>
                    </Tab>
                    <Tab eventKey="signupFreelancer" title="Freelancer - Signup">
                        <FreelancerSignupTab/>
                    </Tab>
                    <Tab eventKey="signupEmployer" title="Employer - Signup">
                        <EmployerSignupTab/>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
};

export default observer(LoginPage);
