import React from "react";
import {Card} from "react-bootstrap";

function EmployerError(props) {
    return (
        <Card className="col-sm-11 col-xl-6">
            <Card.Body>
                <Card.Header><b>Oh no.</b></Card.Header>
                <Card.Text>
                    Sorry, no company with the name {props.companyName} was found.
                </Card.Text></Card.Body>
        </Card>
    )
}

export default EmployerError;
