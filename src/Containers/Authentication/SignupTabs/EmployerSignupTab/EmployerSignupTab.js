import React, {useState} from "react";
import './EmployerSignupTab.css';
import {Button, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../../../../index";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .matches(
            "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*#?&]{8,}$",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One numnber"
        )
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Must match password")
        .required('Required'),
    vat: Yup.string()
    // .test('len', 'Must have a length of 8', val => val.length === 8)
        .required('Required'),
    userName: Yup.string()
        .required('Required'),
    companyName: Yup.string()
        .required('Required')
});

const EmployerSignupTab = (props) => {
    const {userStore} = useStores();
    const [form, setState] = useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        vat: ""
    });
    // const handleChange = event => {
    //     setState({
    //         ...form,
    //         [event.target.name]: event.target.value
    //     });
    // };
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     userStore.registerCompany({...form}).finally(() => {
    //         userStore.loadingUser = false;
    //         props.history.push("/")
    //     })
    // };
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
                    onSubmit={values => console.log(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur}) => (
                        <Form>
                            <label htmlFor="companyName">Company name: </label>
                            <Field name="companyName"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.companyName && errors.companyName ? (
                                       <div>{errors.companyName}</div>) : null}/>
                            <Field name="email"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.email && errors.email ? (<div>{errors.email}</div>) : null}/>
                            <Field name="vat"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.vat && errors.vat ? (<div>{errors.vat}</div>) : null}/>
                            <Field name="username"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.username && errors.username ? (<div>{errors.username}</div>) : null}/>
                            <Field name="password"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.password && errors.password ? (<div>{errors.password}</div>) : null}/>
                            <Field name="confirmPassword"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   className={touched.confirmPassword && errors.confirmPassword ? (<div>{errors.confirmPassword}</div>) : null}/>
                            <button type="submit">submit</button>
                            {/*<Button*/}
                            {/*    onClick={(e) => handleSubmit(e)}*/}
                            {/*    variant="primary" type="submit" size="lg" block>*/}
                            {/*    Sign up*/}
                            {/*</Button>*/}
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default withRouter(observer(EmployerSignupTab));
