import React from "react";
import {Card} from "react-bootstrap";


const JobCard = (props) => {
    return (
            <Card style={{cursor: "pointer"}}>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>
                        {props.title}
                    </Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {new Date(props.date).toDateString()}</small>
                </Card.Footer>
            </Card>
    )
};

export default JobCard;
