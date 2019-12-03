import React from "react";
import './FreelancerSignupTab.css';
import {Button, Col, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {useStores} from "../../../../index";
import * as Yup from "yup";
import {Formik} from "formik";
import FormInput from "../FormInput";

const StudentSignupSchema = Yup.object().shape({
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
    firstName: Yup.string()
        .required('Required'),
    userName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required')
});

const FreelancerSignupTab = (props) => {
    const {userStore} = useStores();

    const handleSubmit = e => {
        userStore.registerStudent({...e}).finally(() => {
            userStore.loadingUser = false;
            props.history.push("/")
        })
    };
    return (
        <div>
            <Container className="LoginForm">
                <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={StudentSignupSchema}
                onSubmit={handleSubmit}>
                    {({values, errors, touched, handleChange, isValid}) => (
                        <Form>
                            <FormInput
                                name="firstName"
                                value={values.firstName}
                                errors={errors.firstName}
                                type="text"
                                text="First name"
                                changeHandler={handleChange}
                                touched={touched.firstName}/>
                            <FormInput
                                name="lastName"
                                value={values.lastName}
                                errors={errors.lastName}
                                type="text"
                                text="Last name"
                                changeHandler={handleChange}
                                touched={touched.lastName}/>
                            <FormInput
                                name="email"
                                type="email"
                                value={values.email}
                                errors={errors.email}
                                text="Email"
                                changeHandler={handleChange}
                                touched={touched.email}/>
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
                            <Button variant="primary" onClick={() => handleSubmit(values)} size="lg" block disabled={!isValid}>Sign up</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default withRouter(observer(FreelancerSignupTab));
