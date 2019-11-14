import React from "react";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";


const Input = (props) => {
    return (
        <FormGroup>
            <FormLabel htmlFor={props.name}>
                {props.title}
            </FormLabel>
        <FormControl
            className="form-input"
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />
        </FormGroup>
    )
};

export default Input;
