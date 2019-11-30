import React, {useState} from "react";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png";
import ProfileCard from "../Components/Card/ProfileCard";
import {observer} from "mobx-react";
import {useStores} from "../index";
import {ClipLoader} from "react-spinners";
import Button from "react-bootstrap/Button";


const CompanyProfilePage = () => {
    const {userStore} = useStores();
    const [company, setCompany] = useState({
        ...userStore.companyUser
    });

    const [edit, setEdit] = useState({
        editMode: false,
        btnText: "Edit"
    });

    const handleInputChange = event => {
      const {name, value} = event. target;
      setCompany({...company, [name]: value});
    };

    const handleSubmit = event => {
      setEdit({editMode: !edit.editMode, btnText: "Submit Changes"});
      if (edit.editMode) {
          event.preventDefault();
          userStore.updateUser({...company}).then(setEdit ({editMode: !edit.editMode, btnText: "Edit"}));
      }
    };

        return (
            userStore.updatingUser? <div className='sweet-loading, LoaderMargins'>
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
                                               src={(userStore.companyUser.logo === '' || null || 'string') ? ProfilePicture : userStore.companyUser.logo}
                                               alt={"No image found"} roundedCircle/>
                                    </Col>
                                    <br/>
                                    <Col xl={7} sm={7} md={7} xs={7}>
                                        <div className="form-group">
                                            <label className="control-label-sm">Email</label>
                                            <input
                                                type="email" value={company.email} id="email"
                                                name="email" onChange={handleInputChange}
                                                disabled={!edit.editMode}
                                                className={(!edit.editMode ? 'form-control-plaintext': 'form-control')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label-sm"> Mobile Number</label>
                                            <input
                                                type="number" maxLength={8} value={company.phoneNumber}
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
                                                        type="text" value={company.companyName}
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
                                                type="number" maxLength={6} value={company.vat}
                                                name="vat" onChange={handleInputChange}
                                                disabled={!edit.editMode}
                                                className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='col-form-label-sm'>Website:</label>
                                            <input
                                                type="text" value={company.website || 'no website'}
                                                name="webSite" onChange={handleInputChange}
                                                disabled={!edit.editMode}
                                                className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label-sm">Address:</label>
                                            <input
                                                type="text" value={company.locationModel.street + " " + company.locationModel.number}
                                                name="address" onChange={handleInputChange}
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
                                    <p> {userStore.companyUser.about}</p>
                                </Row>
                                <hr/>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea" rows="3"
                                        value={company.about} name="about"
                                        onchange={handleInputChange}
                                        disabled={!edit.editMode}
                                        className={(!edit.editMode ? 'form-control-plaintext' : 'form-control')}
                                    />
                                </Form.Group>
                            </Card>
                            <br/>
                            <Card body>
                                <h6 className="jobs">Jobs</h6>
                                <hr/>
                                <p>{userStore.companyUser.jobs}</p>
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

export default observer(CompanyProfilePage);