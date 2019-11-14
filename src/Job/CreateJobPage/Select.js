import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React from "react";


const Select = (props) => {
    return (
        <FormGroup>
            <FormLabel htmlFor={props.name}> {props.title} </FormLabel>
            <FormControl as="select"
                name={props.name}
                value={props.value}
                onChange={props.handleChange}>
                <option value="" disabled>{props.placeholder}</option>
                {props.options.map(option => {
                    return (
                        <option
                            key={option}
                            value={option}
                            label={option}>{option}
                        </option>
                    );
                })}
            </FormControl>
        </FormGroup>)
};

export default Select;
