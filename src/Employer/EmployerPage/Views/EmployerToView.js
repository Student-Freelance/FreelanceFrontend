import React from "react";
import {Card} from "react-bootstrap";

const EmployerToView = (props) => {
    console.log(props.employer);
    const employer = props.employer;

    return (
        <div>
            <Card.Title>
                {employer.companyName}
            </Card.Title>
            <Card.Text>
                {employer.about}
            </Card.Text>
        </div>
    )
};

export default EmployerToView;
