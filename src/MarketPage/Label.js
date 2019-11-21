import React from "react";

const Label = (props) => {
    return(
        <li className="list-group-item d-flex justify-content-between align-items-center"
        onClick={props.clickHandler}>
            {props.tag[0]}
            <span className="badge badge-primary badge-pill">{props.tag[1]}</span>
        </li>
    )
};
export default Label;
