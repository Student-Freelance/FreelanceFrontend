import React from "react";
import {Tab, Tabs} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import FreelancerLoginTab from "./LoginTabs/FreelancerLoginTab/FreelancerLoginTab";
import EmployerLoginTab from "./LoginTabs/EmployerLoginTab/EmployerLoginTab";

function LoginPage() {
    return (
        <div>
            <Container className="LoginCard">
                <Tabs defaultActiveKey="loginFreelancer" id="uncontrolled-tab-example">
                    <Tab eventKey="loginFreelancer" title="Freelancer">
                        <FreelancerLoginTab/>
                    </Tab>
                    <Tab eventKey="loginEmployer" title="Employer">
                        <EmployerLoginTab/>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}

export default LoginPage;
