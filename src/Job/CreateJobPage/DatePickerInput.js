import React from "react";
import {FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";


const DatePickerInput = (props) => {
    console.log(props);
    return (
        <FormGroup>
            <FormLabel htmlFor={props.name}>
                {props.title}
            </FormLabel>
            <DatePicker
                todayButton="Today"
                showWeekNumbers
            selected={props.handleSelected}
            onChange={props.handleChange}
            name={props.name}
            title={props.title}/>
        </FormGroup>
    )
};

export default DatePickerInput;
