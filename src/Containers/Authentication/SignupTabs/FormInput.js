import React from "react";
import FormGroup from "react-bootstrap/FormGroup";
import {FormControl, FormLabel} from "react-bootstrap";

const FormInput = (props) => {
    const {name, value, errors, text, changeHandler, touched, type} = props;
    return (
        <FormGroup>
            <FormLabel>{text}</FormLabel>
            <FormControl
                type={type}
                name={name}
                onChange={changeHandler}
                value={value}
                isInvalid={!!errors}/>
            <div style={{color: "red"}}>{errors}</div>
        </FormGroup>
    )
};

export default FormInput;
