import React from "react";
import {FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker/es";


const DateInput = (props) => {
    return (
        <FormGroup>
            <FormLabel htmlFor={props.name}>
                {props.title}
            </FormLabel>
            <DatePicker
                id={props.name}
                name={props.name}
                value={props.value}
                selected={props.value}
                onChange={props.handleChange}
            />
        </FormGroup>
    )
};

export default DateInput;
