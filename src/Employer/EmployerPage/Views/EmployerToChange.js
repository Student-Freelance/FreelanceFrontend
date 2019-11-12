import {Card} from "react-bootstrap";
import React from "react";

const EmployerToChange = (props) => {
    const employerStore = props.employerStore;
    const employer = props.employerStore.employer;

    return (
        <div>
            <Card.Title>
                <input
                    type="text"
                    placeholder={employer.name}
                    onChange={e => employerStore.setName(e.target.value)}/>
            </Card.Title>
            <Card.Text>
                <input
                    type="text"
                    placeholder={employer.description}
                    onChange={e => employerStore.setDescription(e.target.value)}/>
            </Card.Text>
        </div>
    )
};

export default EmployerToChange;
