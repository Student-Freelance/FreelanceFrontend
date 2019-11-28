import {Badge} from "react-bootstrap";
import React from "react";

const JobBadge = (props) => {
    return(
        <Badge variant="primary">{props.tag}</Badge>
    )
};

export default JobBadge;
