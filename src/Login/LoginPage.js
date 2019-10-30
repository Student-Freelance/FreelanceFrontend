import React from "react";
import './LoginPage.css';
import {Tab, Tabs} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import FreelancerLoginTab from "./LoginTabs/FreelancerLoginTab/FreelancerLoginTab";
import EmployerLoginTab from "./LoginTabs/EmployerLoginTab/EmployerLoginTab";
import EmployerSignupTab from "./SignupTabs/EmployerSignupTab/EmployerSignupTab";
import FreelancerSignupTab from "./SignupTabs/FreelancerSignupTab/FreelancerSignupTab";

function LoginPage() {
    return (
        <div>
            <Container className="LoginTitle">
                <h1>Login</h1>
            </Container>

            <Container className="LoginCard">
                <Tabs defaultActiveKey="loginFreelancer" id="uncontrolled-tab-example">
                    <Tab eventKey="loginFreelancer" title="Freelancer - Login">
                        <FreelancerLoginTab/>
                    </Tab>
                    <Tab eventKey="signupFreelancer" title="Freelancer - Signup">
                        <FreelancerSignupTab/>
                    </Tab>
                    <Tab eventKey="loginEmployer" title="Employer- Login">
                        <EmployerLoginTab/>
                    </Tab>
                    <Tab eventKey="signupEmployer" title="Employer - Signup">
                        <EmployerSignupTab/>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}

export default LoginPage;
