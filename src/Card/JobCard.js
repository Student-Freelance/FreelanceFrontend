import React from "react";
import {Card} from "react-bootstrap";
import {Link, Route} from "react-router-dom";
import DetailedJobPage from "../Job/DetailedJobPage/DetailedJobPage";


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
                    <Card.Link><Link to="/detailedJob">Visit post</Link></Card.Link>

                    <Route exact path="/detailedJob" component={DetailedJobPage} />
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {props.date}</small>
                </Card.Footer>
            </Card>
    )
};

export default JobCard;
