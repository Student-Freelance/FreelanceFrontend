import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const Label = (props) => {

    return(
        <ListGroupItem as="li" className="d-flex justify-content-between align-items-center"
        onClick={props.clickHandler}>
            {props.tag[0]}
            <span className="badge badge-primary badge-pill">{props.tag[1]}</span>
        </ListGroupItem>
    )
};
export default Label;
