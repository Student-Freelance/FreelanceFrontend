import React from "react";
import './EmployerLoginTab.css';
import {Tab, Tabs, Button} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function EmployerLoginTab() {
    return (

        <div>
            <Container className="LoginButtons">
                <Button variant="primary" size="lg" block>
                    Employer button 1
                </Button>
                <Button variant="secondary" size="lg" block>
                    Employer button 2
                </Button>
            </Container>
        </div>

    )
}

export default EmployerLoginTab;
