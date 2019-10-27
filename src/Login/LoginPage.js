import React from "react";
import {Tab, Tabs} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function LoginPage() {
    return (
        <div>
            <Container className="LoginCard">
                <Tabs defaultActiveKey="loginFreelancer" id="uncontrolled-tab-example">
                    <Tab eventKey="loginFreelancer" title="Freelancer">
                        {/* <Sonnet /> */}
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
