import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./StudentProfilePage.css"
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png"
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react";
import {useStores} from "../index";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";

const StudentProfilePage = (props) => {

    const {userStore} = useStores();
    const [student, setStudent] = useState({
        ...userStore.studentUser
    });

    const [edit, setEdit] = useState({
        editMode: false,
        btnText: "Edit"
    });

    const handleIndputChange = event => {
        const {name, value} = event.target;
        setStudent({...student, [name]: value});
    };

    const handleSubmit = event => {
        setEdit({editMode: !edit.editMode, btnText: "Submit Changes"});
        if (edit.editMode) {
            event.preventDefault();
            userStore.updateUser({...student}).then(setEdit({editMode: !edit.editMode, btnText: "Edit"}));
        }
    };

    return (
        userStore.updatingUser? <div className='sweet-loading, LoaderMargins'
            >
                <ClipLoader
                    size={150} // or 150px
                    color={'#123abc'}
                />
            </div>:
        <div>
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
                                    <br/>
                                    <Col xl={7} sm={7} md={7} xs={7}>
                                        <div className="form-group">
                                        <label className="control-label-sm">Email</label>
                                        <input
                                            type="email" value={student.email} id="email"
                                            name="email" onChange={handleIndputChange}
                                            disabled={!edit.editMode}
                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                        />
                                        </div>
                                        <div className="form-group">
                                        <label className='col-form-label-sm'>Mobilnummer:</label>
                                        <input
                                            type="number" maxLength={8} value={student.phoneNumber}
                                            name="phoneNumber" onChange={handleIndputChange}
                                            disabled={!edit.editMode}
                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                        />
                                        </div>
                                    </Col>
                                    <br/>
                                    <div className="container">
                                        <Row>
                                            <Col>
                                                <label className='col-form-label-sm'>Fornavn</label>
                                            <input
                                                type="text" value={student.firstname}
                                                name="firstname" onChange={handleIndputChange}
                                                disabled={!edit.editMode}
                                                className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                            />
                                            </Col>
                                            <Col>
                                                <label className='col-form-label-sm'>Efternavn</label>
                                            <input
                                                type="text" value={student.lastname}
                                                name="lastname" onChange={handleIndputChange}
                                                disabled={!edit.editMode}
                                                className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                            />
                                            </Col>
                                            <Col>
                                                <label className='col-form-label-sm'>Brugernavn</label>
                                                <input
                                                    type="text" value={student.username}
                                                    name="username" onChange={handleIndputChange}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </Card>
                            <br/>
                            <Card body>
                                <Row sm={12} md={12} xl={12}>
                                    <Col xl={7}>
                                        <label className='col-form-label-sm'>Semester:</label>
                                        <input
                                            type="number" maxLength={2} value={student.semester}
                                            name="semester" onChange={handleIndputChange}
                                            disabled={!edit.editMode}
                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                        />
                                        <h6>Tag: {userStore.studentUser.tags}</h6>
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
                                <Form.Group controlId="exampleForm.ControlTextarea1">
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
        </div>
    )
};

export default observer(StudentProfilePage);