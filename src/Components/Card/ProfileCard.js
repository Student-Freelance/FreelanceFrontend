import {Card} from "react-bootstrap";
import React from "react";


const ProfileCard = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {props.title}
                </Card.Title>
                <hr/>
                <Card.Text>
                    {props.text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default ProfileCard;