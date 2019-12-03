import React, {useState} from "react";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png";
import {observer} from "mobx-react";
import {useStores} from "../index";
import {ClipLoader} from "react-spinners";
import Button from "react-bootstrap/Button";
import {set} from "mobx";
import JobObjectComponent from "../Components/JobObjectComponent";


const CompanyProfilePage = () => {
    const {userStore, jobStore} = useStores();

    const [edit, setEdit] = useState({
        editMode: false,
        btnText: "Edit"
    });

    const handleInputChange = event => {
        set(userStore.companyUser, event.target.name, event.target.value);
    };

    const handleLocationChange = event => {
      set(userStore.companyUser.locationModel, event.target.name, event.target.value);
    };

    const handleSubmit = event => {
        setEdit({editMode: !edit.editMode, btnText: "Submit Changes"});
        if (edit.editMode) {
            event.preventDefault();
            userStore.updateUser({...userStore.companyUser}).then(setEdit({editMode: !edit.editMode, btnText: "Edit"}));
        }
    };

    return (
        userStore.updatingUser||jobStore.isLoading ? <div className='sweet-loading, LoaderMargins'>
                <ClipLoader
                    size={150} // or 150px
                    color={'#123abc'}
                />
            </div> :
            <div>
                <Container>
                    <h3 className="profilHeadline">Profile</h3>
                    <Row sm={12} md={12} xl={12}>
                        <InputGroup>
                            <Col xl={5}>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={5} sm={5} md={5} xs={5}>
                                            {edit.editMode ?
                                                <div><label className="control-label-sm">Enter picture link</label>
                                                    <input
                                                        type="url" value={userStore.companyUser.logo}
                                                        name="logo" onChange={handleInputChange}
                                                        className='form-control'
                                                    />
                                                </div>
                                                :
                                                <Image fluid
                                                       src={(userStore.companyUser.logo === null) ? ProfilePicture : userStore.companyUser.logo}
                                                       alt={"No image found"} />
                                            }
                                        </Col>
                                        <br/>
                                        <Col xl={7} sm={7} md={7} xs={7}>
                                            <div className="form-group">
                                                <label className="control-label-sm">Email</label>
                                                <input
                                                    type="email" value={userStore.companyUser.email} id="email"
                                                    name="email" onChange={handleInputChange}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label-sm"> Mobile Number</label>
                                                <input
                                                    type="number" maxLength={8} value={userStore.companyUser.phoneNumber}
                                                    name="phoneNumber" onChange={handleInputChange}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                        </Col>
                                    <br/>
                                        <div className="container">
                                            <Row>
                                                <Col>
                                                    <div className="form-group">
                                                        <label className='col-form-label-sm'>Name</label>
                                                        <input
                                                            type="text" value={userStore.companyUser.companyName}
                                                            name="companyName" onChange={handleInputChange}
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
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={7}>
                                            <div className="form-group">
                                                <label className='col-form-label-sm'>Vat:</label>
                                                <input
                                                    type="number" maxLength={6} value={userStore.companyUser.vat}
                                                    name="vat" onChange={handleInputChange}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='col-form-label-sm'>Website:</label>
                                                <input
                                                    type="text" value={userStore.companyUser.website}
                                                    name="webSite" onChange={handleInputChange}
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label-sm">Address:</label>
                                                <input
                                                    type="text"
                                                    value={userStore.companyUser.locationModel.street}
                                                    name="street" onChange={handleLocationChange}
                                                    disabled={!edit.editMode}
                                                    placeholder="Street"
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                                <input
                                                    type="number"
                                                    value={userStore.companyUser.locationModel.number}
                                                    name="number" onChange={handleLocationChange}
                                                    disabled={!edit.editMode}
                                                    placeholder="Number"
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                                <input type="number"
                                                       value={userStore.companyUser.locationModel.zip}
                                                       name="zip" onChange={handleLocationChange}
                                                       placeholder="Zip"
                                                       disabled={!edit.editMode}
                                                       className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                                <input
                                                    type="text"
                                                    value={userStore.companyUser.locationModel.city}
                                                    name="city" onChange={handleLocationChange}
                                                    placeholder="City"
                                                    disabled={!edit.editMode}
                                                    className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xl={7}>
                                <Card body>
                                    <Row sm={12} md={12} xl={12}>
                                        <Col xl={10} md={10} sm={10} xs={10}>
                                            <h6 className="About">About</h6>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea" rows="3"
                                            value={userStore.companyUser.about}
                                            name="about" onChange={handleInputChange}
                                            disabled={!edit.editMode}
                                            className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                        />
                                    </Form.Group>
                                </Card>
                                <br/>
                                <Card body>
                                    <JobObjectComponent
                                        description="Jobs"
                                        storelink={userStore.userJobs}
                                        name="job"
                                        editMode={edit.editMode}
                                    />
                                </Card>
                                <br/>
                                <Button
                                    onClick={(event) => handleSubmit(event)}
                                    variant="primary" type="submit" size="lg" block>
                                    {edit.btnText}
                                </Button>
                                {edit.editMode ? <Button variant="outline-danger" size="lg"
                                                         onClick={() => setEdit({editMode: false, btnText: "Edit"})}
                                                         block>Cancel</Button> : null}
                            </Col>
                        </InputGroup>
                    </Row>
                </Container>
            </div>
    )
};

export default observer(CompanyProfilePage);