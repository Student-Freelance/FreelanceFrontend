import {Card} from "react-bootstrap";
import React from "react";

const EmployerToChange = (props) => {
    const employer = props.employer;

    // noinspection JSPrimitiveTypeWrapperUsage
    return (
        <div>
            <Card.Title>
                <input
                    type="text"
                    placeholder={employer.companyName}
                    onChange={e => employer.companyName = (e.target.value)}/>
            </Card.Title>
            <Card.Text>
                <input
                    type="text"
                    placeholder={employer.about}
                    onChange={e => employer.about = (e.target.value)}/>
            </Card.Text>
        </div>
    )
};

export default EmployerToChange;
