import React from "react";
import './FreelancerLoginTab.css';
import {Tab, Tabs, Button} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function FreelancerLoginTab() {
    return (
        <div>
            <Container className="LoginButtons">
                <Button variant="primary" size="lg" block>
                    Block level button
                </Button>
                <Button variant="secondary" size="lg" block>
                    Block level button
                </Button>
            </Container>
        </div>
    )
}

export default FreelancerLoginTab;
