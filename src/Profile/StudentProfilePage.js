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
import {set} from 'mobx';
import ArrayComponent from "../Components/ArrayComponent";


const StudentProfilePage = () => {

    const {userStore} = useStores();
    const [edit, setEdit] = useState({
        editMode: false,
        btnText: "Edit"
    });
    const handleChange = (event) => {
        set(userStore.studentUser, event.target.name, event.target.value);

    };
    const handleLocationChange = event => {
        set(userStore.studentUser.locationModel, event.target.name, event.target.value);
    };

    const handleSubmit = event => {
        setEdit({editMode: !edit.editMode, btnText: "Submit Changes"});
        if (edit.editMode) {
            event.preventDefault();
            userStore.updateUser({...userStore.studentUser}).then(setEdit({editMode: !edit.editMode, btnText: "Edit"}));
        }
    };
    return (
        userStore.updatingUser ? <div className='sweet-loading, LoaderMargins'
            >
                <ClipLoader
                    size={150} // or 150px
                    color={'#123abc'}
                />
            </div> :
            <div>
                <Container>
                    <Row>
                        <Col><h3><input
                            type="text" value={userStore.studentUser.username}
                            name="username" onChange={handleChange}
                            placeholder="Username"
                            disabled={!edit.editMode}
                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                        /></h3>
                                <br/>
                                <label><b>Semester:</b></label>
                                    <input
                                    type="number" maxLength='2' value={userStore.studentUser.semester}
                                    name="semester" onChange={handleChange}
                                    placeholder={edit.editMode?"semester":""}
                                    disabled={!edit.editMode}
                                    className={'text-left ' + (!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                />

                        </Col>
                        <Col> </Col>
                    </Row>
                    <Row sm={12} md={12} xl={12}>
                        <InputGroup>
                            <Col xl={5}>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col sm={3}>
                                            {edit.editMode ?
                                                <div><label className="control-label-sm"><b>Enter picture link</b></label>
                                                    <input
                                                        type="url" value={userStore.studentUser.logo}
                                                        name="logo" onChange={handleChange}
                                                        className='form-control'
                                                    />
                                                </div>
                                                :
                                                <Image fluid
                                                       src={(userStore.studentUser.logo === null) ? ProfilePicture : userStore.studentUser.logo}
                                                       alt={"No image found"} roundedCircle/>
                                            }
                                        </Col>
                                        <br/>
                                        <Col>
                                            <div className="form-group">
                                                <label className="control-label-sm"><b>Contact Information:</b></label>
                                                <input
                                                    type="email" value={userStore.studentUser.email} id="email"
                                                    name="email" onChange={handleChange}
                                                    placeholder={edit.editMode?"Enter Email":""}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                                <input
                                                    type="url"
                                                    value={(userStore.studentUser.website)?userStore.studentUser.website:""}
                                                    name="website" onChange={handleChange}
                                                    placeholder={edit.editMode?"Enter Website":""}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                                <input
                                                    type="number" maxLength='8'
                                                    value={(userStore.studentUser.phoneNumber)?(userStore.studentUser.phoneNumber):""}
                                                    name="phoneNumber" onChange={handleChange}
                                                    placeholder={edit.editMode?"Enter Phonenumber":""}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                        </Col>
                                        <br/>
                                        <div className="container">
                                            <Row>
                                                <Col>
                                                    <label className='col-form-label-sm'><b>Name:</b></label>
                                                    <div className="form__group">
                                                        <input
                                                            type="text" value={userStore.studentUser.firstname}
                                                            name="firstname" onChange={handleChange}
                                                            placeholder={edit.editMode?"Enter Firstname":""}
                                                            disabled={!edit.editMode}
                                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                        <input
                                                            type="text" value={userStore.studentUser.lastname}
                                                            name="lastname" onChange={handleChange}
                                                            disabled={!edit.editMode}
                                                            placeholder={edit.editMode?"Enter Lastname":""}
                                                            className={"input-group-prepend " + (!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                    </div>

                                                </Col>
                                                <Col>
                                                    <label
                                                        className='col-form-label-sm'><b>Address:</b></label>
                                                    <div className="form__group">
                                                        <input
                                                            type="text"
                                                            value={userStore.studentUser.locationModel.street}
                                                            name="street"
                                                            placeholder={edit.editMode?"Enter Street":""}
                                                            onChange={handleLocationChange}
                                                            disabled={!edit.editMode}
                                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder={edit.editMode?"Enter street number":""}
                                                            value={userStore.studentUser.locationModel.number}
                                                            name="number" onChange={handleLocationChange}
                                                            disabled={!edit.editMode}
                                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                    </div>
                                                    <div className="form__group">
                                                        <input
                                                            type="number" value={userStore.studentUser.locationModel.zip}
                                                            name="zip" onChange={handleLocationChange}
                                                            placeholder={edit.editMode?"Enter Zip Code":""}
                                                            disabled={!edit.editMode}
                                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                        <input
                                                            type="text" value={userStore.studentUser.locationModel.city}
                                                            name="city"
                                                            placeholder={edit.editMode?"Enter city name":""}
                                                            onChange={handleLocationChange}
                                                            disabled={!edit.editMode}
                                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                </Card>
                                <br/>
                                <Row sm={12} md={12} xl={12}>
                                    <Col>
                                        <ArrayComponent storelink={userStore.studentUser.tags}
                                                        description="Technologies" editMode={edit.editMode}
                                                        name="tags"/>
                                    </Col>
                                    <Col>
                                        <ArrayComponent storelink={userStore.studentUser.competences}
                                                        description="Competences" editMode={edit.editMode}
                                                        name="competences"/>
                                    </Col>
                                </Row>
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
                                                      disabled={!edit.editMode}
                                                      value={userStore.studentUser.resume} name="resume"
                                                      onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Card>
                                <br/>
                                <Row sm={12} md={12} xl={12}>
                                    <Col>
                                        <ArrayComponent storelink={userStore.studentUser.education}
                                                        description="Education:" editMode={edit.editMode}
                                                        name="education"/>
                                    </Col>
                                    <Col>
                                        <ArrayComponent storelink={userStore.studentUser.experience}
                                                        description="Experience:" editMode={edit.editMode}
                                                        name="experience"/>
                                    </Col>
                                    <br/>
                                </Row>
                                <br/>
                                <Button
                                    onClick={(event) => handleSubmit(event)}
                                    variant="primary" type="submit" size="lg" block>
                                    {edit.btnText}
                                </Button>
                                {edit.editMode?<Button variant= "outline-danger" size="lg"
                                                       onClick={() => setEdit({ editMode: false, btnText: "Edit"})}
                                                       block>Cancel</Button>:null}
                            </Col>
                        </InputGroup>
                    </Row>
                </Container>
            </div>
    )
};

export default observer(StudentProfilePage);
