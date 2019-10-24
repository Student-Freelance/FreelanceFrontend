import React from "react";
import {Card} from "react-bootstrap";

const EmployerToView = (props) => {
    console.log(props.employer);
    const employer = props.employer;

    return (
        <div>
            <Card.Title>
                {employer.name}
            </Card.Title>
            <Card.Text>
                {employer.description}
            </Card.Text>
        </div>
    )
};

export default EmployerToView;
