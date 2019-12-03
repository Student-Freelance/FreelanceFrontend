import React, {useState} from "react";
import './EmployerSignupTab.css';
import {Button} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../../../../index";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormInput from "../FormInput";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .matches(new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$"
            ),
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One numnber"
        )
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Must match password")
        .required('Required'),
    vat: Yup.string()
        .required('Required'),
    userName: Yup.string()
        .required('Required'),
    companyName: Yup.string()
        .required('Required')
});

const EmployerSignupTab = (props) => {
    const {userStore} = useStores();

    const handleSubmit = e => {
        userStore.registerCompany({...e}).finally(() => {
            userStore.loadingUser = false;
            props.history.push("/")
        })
    };

    return (
        <div>
            <Container className="LoginForm">
                <Formik
                    initialValues={{
                        email: "",
                        userName: "",
                        password: "",
                        confirmPassword: "",
                        companyName: "",
                        vat: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}>
                    {({values, errors, touched, handleChange, isValid}) => (
                        <Form>
                            <FormInput
                                name="companyName"
                                value={values.companyName}
                                errors={errors.companyName}
                                type="text"
                                text="Company name"
                                changeHandler={handleChange}
                                touched={touched.companyName}/>
                            <FormInput
                                name="email"
                                type="email"
                                value={values.email}
                                errors={errors.email}
                                text="Email"
                                changeHandler={handleChange}
                                touched={touched.email}/>
                            <FormInput
                                name="vat"
                                type="number"
                                value={values.vat}
                                errors={errors.vat}
                                text="CVR/VAT"
                                changeHandler={handleChange}
                                touched={touched.vat}/>
                            <FormInput
                                type="text"
                                name="userName"
                                value={values.userName}
                                errors={errors.userName}
                                text="Username"
                                changeHandler={handleChange}
                                touched={touched.userName}/>
                            <FormInput
                                type="password"
                                name="password"
                                value={values.password}
                                errors={errors.password}
                                text="Password"
                                changeHandler={handleChange}
                                touched={touched.password}/>
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                errors={errors.confirmPassword}
                                text="Confirm password"
                                changeHandler={handleChange}
                                touched={touched.confirmPassword}/>
                            <Button variant="primary" type="submit" size="lg" block disabled={!isValid}>Sign up</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default withRouter(observer(EmployerSignupTab));
