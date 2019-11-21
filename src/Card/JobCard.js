import React from "react";
import {Card} from "react-bootstrap";


const JobCard = (props) => {
    return (
        <Card>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title
                    style={{cursor: "pointer"}}
                    onClick={props.handleJobClick}>
                    {props.title}
                </Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>

            </Card.Body>
            <Card.Footer>
                <Card.Text
                    style={{cursor: "pointer"}}
                    onClick={props.handleCompanyClick}>{props.companyName}</Card.Text>
                <small className="text-muted">Created at {new Date(props.date).toDateString()}</small>
            </Card.Footer>
        </Card>
    )
};

export default JobCard;
