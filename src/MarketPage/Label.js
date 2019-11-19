import React from "react";

const Label = (props) => {
    console.log(props);
    return(
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.tag[0]}
            <span className="badge badge-primary badge-pill">{props.tag[1]}</span>
        </li>
    )
};
export default Label;
