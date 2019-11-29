import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./StudentProfilePage.css"
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png"
import {Col, InputGroup, Row, Form} from "react-bootstrap";
import ProfileCard from "../Components/Card/ProfileCard";
import {observer} from "mobx-react";
import {useStores} from "../index";
import {AxiosAgent} from "../Web/AxiosAgent";
import Button from "react-bootstrap/Button";
import {studentObject} from "../Models/userObjects";

const StudentProfilePage = (props) => {

    const {userStore} = useStores();
    const [student, setStudent] = useState({
        //email: "",
        phoneNumber: "",
        semester: 0,
        resume: "",
       /* education: "",
        experience: "",
        competences: "",*/
        isStudent: true
    });

    const [edit, setEdit] = useState({
        editMode: false,
        btnText: "edit"
    });

    const handleIndputChange = event => {
        const {name, value} = event.target;
        setStudent({...student, [name]: value});
    };

    const handleSubmit = event => {
        setEdit( {editMode: !edit.editMode});
        console.log(edit.editMode);
        // edit.editMode ? setEdit({btnText: "edit"}) : setEdit({btnText: "save"});
        if(edit.editMode){
            console.log(student);
            event.preventDefault();
            userStore.updateUser({...student});
        }
    };

        return (
            <div>
                {edit.editMode ?

                <Container>
                    <h3 className="profilHeadline">Profile</h3>
                    <Row sm={12} md={12} xl={12}>
                        <InputGroup>
                            <Col xl={5}>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={5} sm={5} md={5} xs={5}>
                                            <Image fluid
                                                   src={((userStore.studentUser.logo) === '' || null || 'string') ? ProfilePicture : userStore.studentUser.logo}
                                                   alt={"No image found"} roundedCircle/>
                                        </Col>
                                        <Col xl={7} sm={7} md={7} xs={7}>
                                            <br/>
                                            <h6>Name: {userStore.studentUser.firstname + " " + userStore.studentUser.lastname} </h6>
                                            <h6>Email: {userStore.studentUser.email}</h6>
                                        </Col>
                                    </Row>
                                </Card>
                                <br/>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={7}>
                                            <label>Telefon nummer: {userStore.studentUser.phoneNumber}</label>
                                            <input
                                                type="number" maxLength={8} value={student.phoneNumber} name="phoneNumber"
                                                placeholder={userStore.studentUser.phoneNumber}
                                                onChange={handleIndputChange}
                                            />
                                            <h6>Tag: {userStore.studentUser.tags}</h6>
                                            <label>Semester: {userStore.studentUser.semester}</label>
                                            <input
                                                type="number" maxLength={1} value={student.semester.length} name="semester"
                                                placeholder={userStore.studentUser.semester}
                                                onChange={handleIndputChange}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                                <br/>
                            </Col>
                            <Col xl={7}>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={10} md={10} sm={10} xs={10}>
                                            <h6 className="resume"> Resume</h6>
                                        </Col>
                                        <hr/>
                                    </Row>
                                    <hr/>
                                    <Form.Label>{userStore.studentUser.resume}</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Rediger resume</Form.Label>
                                        <Form.Control as="textarea" rows="3"
                                                      value={student.resume} name="resume"
                                                      onChange={handleIndputChange}
                                        />
                                    </Form.Group>
                                </Card>
                                <br/>
                                <Card body>
                                    <h6 className="education">Min uddannelse</h6>
                                    <hr/>
                                    <p>{userStore.studentUser.education}</p>
                                </Card>
                                <br/>
                                <Card body>
                                    <h6 className="experience">Min erfaring</h6>
                                    <hr/>
                                    <p>{userStore.studentUser.experience}</p>
                                </Card>
                                <br/>
                                <Card body>
                                    <h6 className="skills">Mine kompetencer</h6>
                                    <hr/>
                                    <p>{userStore.studentUser.competences}</p>
                                </Card>
                                <Button
                                    onClick={(event) => handleSubmit(event)}
                                    variant="primary" type="submit" size="lg" block>
                                    {edit.btnText}
                                </Button>
                            </Col>
                        </InputGroup>
                    </Row>
                </Container>
                :
                <Container>
                    <h3 className="profilHeadline">Profile</h3>
                    <Row sm={12} md={12} xl={12}>
                        <InputGroup>
                        <Col xl={5}>
                            <Card body>
                                <Row sm={12} md={12} xl={12}>
                                    <Col xl={5} sm={5} md={5} xs={5}>
                                        <Image fluid
                                               src={((userStore.studentUser.logo) === '' || null || 'string') ? ProfilePicture : userStore.studentUser.logo}
                                               alt={"No image found"} roundedCircle/>
                                    </Col>
                                    <Col xl={7} sm={7} md={7} xs={7}>
                                        <br/>
                                        <h6>Name: {userStore.studentUser.firstname + " " + userStore.studentUser.lastname} </h6>
                                        <h6>Email: {userStore.studentUser.email}</h6>
                                    </Col>
                                </Row>
                            </Card>
                            <br/>
                            <Card body>
                                <Row sm={12} md={12} xl={12}>
                                    <Col xl={7}>
                                        <label>Telefon nummer: {userStore.studentUser.phoneNumber}</label>
                                        <h6>Tag: {userStore.studentUser.tags}</h6>
                                        <label>Semester: {userStore.studentUser.semester}</label>
                                    </Col>
                                </Row>
                            </Card>
                            <br/>
                        </Col>
                        <Col xl={7}>
                            <Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={10} md={10} sm={10} xs={10}>
                                    <h6 className="resume"> Resume</h6>
                                </Col>
                                <hr/>
                            </Row>
                            <hr/>
                                <Form.Label>{userStore.studentUser.resume}</Form.Label>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="education">Min uddannelse</h6>
                            <hr/>
                            <p>{userStore.studentUser.education}</p>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="experience">Min erfaring</h6>
                            <hr/>
                            <p>{userStore.studentUser.experience}</p>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="skills">Mine kompetencer</h6>
                            <hr/>
                            <p>{userStore.studentUser.competences}</p>
                        </Card>
                            <Button
                                onClick={(event) => handleSubmit(event)}
                                variant="primary" type="submit" size="lg" block>
                                {edit.btnText}
                            </Button>
                        </Col>
                        </InputGroup>
                    </Row>
                </Container>}
            </div>
        )
};

export default observer(StudentProfilePage);