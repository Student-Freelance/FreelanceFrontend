import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";


const JobCard = (props) => {
    return (
            <Card>
                <Card.Img variant="top"
                             src={props.url}/>
                <Card.Body>
                    <Card.Title>
                        {props.title}
                    </Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                    <Card.Link><Link to={'detailedJob/'+props.jobId}>Visit post</Link></Card.Link>

                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {props.date}</small>
                </Card.Footer>
            </Card>
    )
};

export default JobCard;
