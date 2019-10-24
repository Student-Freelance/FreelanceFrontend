import React from "react";
import {Card} from "react-bootstrap";

const EmployerToView = (props) => {
    console.log(props.employer);
    const employer = props.employer;

    return (
        <div>
            <Card.Body>
                <Card.Title>
                    {employer.name}
                </Card.Title>
                <Card.Text>
                    {employer.description}
                </Card.Text>
            </Card.Body>
        </div>
    )
};

export default EmployerToView;
