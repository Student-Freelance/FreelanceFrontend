import React from "react";
import {Tab, Tabs} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import FreelancerLoginTab from "./FreelancerLoginTab/FreelancerLoginTab";

function LoginPage() {
    return (
        <div>
            <Container className="LoginCard">
                <Tabs defaultActiveKey="loginFreelancer" id="uncontrolled-tab-example">
                    <Tab eventKey="loginFreelancer" title="Freelancer">
                        <FreelancerLoginTab/>
                    </Tab>
                    <Tab eventKey="loginEmployer" title="Employer">
                        {/* <Sonnet /> */}
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}

export default LoginPage;
